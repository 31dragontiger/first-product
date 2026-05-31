import { useState } from 'react'
import './App.css'

interface Intervention {
  action: string;
  rationale: string;
}

interface ResultData {
  diagnosis: string;
  symptoms: string;
  interventions: Intervention[];
}

function App() {
  const [diseaseName, setDiseaseName] = useState('')
  const [bloodPressure, setBloodPressure] = useState('')
  const [mainSymptom, setMainSymptom] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState('')

  const diseases = [
    "고혈압", "당뇨", "폐렴", "고지혈증", "심부전", 
    "COPD", "천식", "뇌졸중", "위궤양", "신부전", 
    "심근경색", "간경화"
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!diseaseName) {
      setError('질병을 선택해주세요.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // 배포된 Cloudflare Worker 주소로 연결
      const baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? '' 
        : 'https://nursing-guide-api.31dragontiger.workers.dev';

      const response = await fetch(`${baseUrl}/api/interventions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          disease_name: diseaseName,
          blood_pressure: bloodPressure,
          main_symptom: mainSymptom
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.detail || '해당 질병 데이터를 찾을 수 없습니다.')
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(`서버 연결 오류: ${err.message}. 잠시 후 다시 시도해 주세요.`);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <nav className="nav-bar">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="icon">🏥</span>
            <span className="brand-name">간호도우미요정</span>
          </div>
          <div className="nav-links">
            <span className="org-badge">Pull up to Wonju</span>
          </div>
        </div>
      </nav>

      <header className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="gradient-text">Smart Nursing Care Planner</h1>
            <p className="hero-description">
              임상 실습의 혁신, 환자 맞춤형 간호 계획을 1초 만에 생성하세요.
            </p>
            <div className="hero-badges">
              <span>#경동대학교</span>
              <span>#창업동아리</span>
              <span>#간호표준가이드</span>
            </div>
          </div>
          <div className="hero-visual">
             <div className="visual-glow"></div>
             <img 
               src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1600" 
               alt="Smart Nursing Care Assistant" 
               className="hero-img" 
               onError={(e) => {
                 (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600";
               }}
             />
          </div>
        </div>
      </header>

      <main className="content">
        <section className="usage-guide">
          <div className="section-header">
            <h2>How to Use</h2>
            <p>세 단계만으로 전문적인 간호 계획을 수립하세요</p>
          </div>
          <div className="guide-grid">
            <div className="guide-item">
              <span className="step-num">01</span>
              <h3>질병 선택</h3>
              <p>대상자의 주 진단명을 목록에서 선택합니다.</p>
            </div>
            <div className="guide-item">
              <span className="step-num">02</span>
              <h3>활력징후 입력</h3>
              <p>혈압(BP)을 입력하여 위험 수치를 분석합니다.</p>
            </div>
            <div className="guide-item">
              <span className="step-num">03</span>
              <h3>증상 기록</h3>
              <p>환자의 주증상을 적고 맞춤 중재를 생성합니다.</p>
            </div>
          </div>
        </section>

        <section className="planner-section" id="planner">
          <div className="form-container">
            <div className="form-header">
              <span className="form-icon">📋</span>
              <h2>간호 계획 생성기</h2>
            </div>
            
            <div className="search-form">
              <div className="input-group">
                <label>1. 대상자 진단명 선택</label>
                <div className="disease-chips">
                  {diseases.map(d => (
                    <button 
                      key={d} 
                      className={`chip ${diseaseName === d ? 'active' : ''}`}
                      onClick={() => setDiseaseName(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>2. 혈압 (BP)</label>
                  <div className="input-with-icon">
                    <span className="inner-icon">🌡️</span>
                    <input
                      type="text"
                      placeholder="예: 150/90"
                      value={bloodPressure}
                      onChange={(e) => setBloodPressure(e.target.value)}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label>3. 주증상 (Chief Complaint)</label>
                  <div className="input-with-icon">
                    <span className="inner-icon">🩺</span>
                    <input
                      type="text"
                      placeholder="예: 호흡곤란, 급성 통증"
                      value={mainSymptom}
                      onChange={(e) => setMainSymptom(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => handleSubmit()} 
                className="submit-btn" 
                disabled={loading || !diseaseName}
              >
                {loading ? (
                  <span className="loader-container">
                    <span className="spinner"></span> 데이터 분석 중...
                  </span>
                ) : '맞춤형 간호 계획 생성하기'}
              </button>
            </div>
          </div>
        </section>

        {error && (
          <div className="error-card">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-area animate-fade-in">
            <div className="result-header">
              <span className="badge">분석 완료</span>
              <h2>Nursing Process Analysis</h2>
            </div>

            <div className="info-grid">
              <div className="card info-card symptom-bg">
                <div className="card-header">
                  <span className="card-icon">🔍</span>
                  <h3>질환별 대표 증상</h3>
                </div>
                <p className="symptom-text">{result.symptoms}</p>
              </div>

              <div className="card info-card diagnosis-bg">
                <div className="card-header">
                  <span className="card-icon">✍️</span>
                  <h3>간호 진단 (NANDA)</h3>
                </div>
                <p className="diagnosis-text">{result.diagnosis}</p>
              </div>
            </div>

            <div className="intervention-list">
              <div className="section-title">
                <span className="pulse-dot"></span> 핵심 간호 중재 및 이론적 근거
              </div>
              
              {result.interventions.map((item, index) => (
                <div key={index} className="card intervention-card">
                  <div className="intervention-block">
                    <div className="block-header">
                      <span className="block-tag plan-tag">Plan & Action</span>
                    </div>
                    <p>{item.action}</p>
                  </div>
                  <div className="rationale-block">
                    <div className="block-header">
                      <span className="block-tag rationale-tag">Scientific Rationale</span>
                    </div>
                    <p>{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <section className="about-section">
          <div className="about-card">
            <div className="about-text">
              <h2>About Pull up to Wonju</h2>
              <p>
                본 플랫폼은 <strong>경동대학교 창업동아리 'Pull up to Wonju'</strong>에서 제작되었습니다.<br />
                우리는 원주를 기반으로 간호 학생과 현직 간호사들의 업무 효율을 높이고, 
                표준화된 간호 가이드를 제공하여 의료 서비스의 질을 향상시키는 것을 목표로 합니다.
              </p>
              <div className="contact-info">
                <span>📍 경동대학교 원주 메디컬 캠퍼스</span>
                <span>📧 Contact: nursing.fairy@kdu.ac.kr</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>© 2026 Nursing Fairy. Designed by Pull up to Wonju.</p>
          <div className="footer-links">
            <span>개인정보처리방침</span>
            <span>이용약관</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
