import { useState } from 'react'
import './App.css'

interface Intervention {
  action: string;
  rationale: string;
}

interface ResultData {
  diagnosis: string;
  interventions: Intervention[];
}

function App() {
  const [diseaseName, setDiseaseName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ResultData | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!diseaseName.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Vite Proxy를 사용하여 상대 경로로 호출 (vite.config.ts 설정 참조)
      const response = await fetch('/api/interventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disease_name: diseaseName }),
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
        <div className="nav-brand">
          <span className="icon">🧚</span>
          <span className="brand-name">간호도우미요정</span>
          <span className="sub-title">Pull up to Wonju</span>
        </div>
      </nav>

      <main className="content">
        <section className="search-hero">
          <h1>맞춤형 간호 케어 가이드</h1>
          <p>임상 실습과 학습을 돕는 스마트한 간호 정보 시스템</p>
          
          <form onSubmit={handleSubmit} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="검색할 질병명을 입력하세요 (고혈압, 당뇨, 폐렴 등)"
                value={diseaseName}
                onChange={(e) => setDiseaseName(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? '분석 중...' : '중재 방법 확인'}
              </button>
            </div>
          </form>
        </section>

        {error && (
          <div className="error-card">
            <span className="error-icon">❕</span>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result-area">
            <div className="result-header">
              <h2>간호 프로세스 분석 결과</h2>
              <div className="divider"></div>
            </div>

            <div className="card main-card">
              <div className="card-tag">Nursing Diagnosis</div>
              <h3>전문적 간호 진단</h3>
              <p className="diagnosis-text">{result.diagnosis}</p>
            </div>

            <div className="intervention-list">
              <div className="section-title">
                <span className="dot"></span> 핵심 간호 중재 및 근거
              </div>
              
              {result.interventions.map((item, index) => (
                <div key={index} className="card intervention-card">
                  <div className="intervention-block">
                    <span className="block-label">간호 계획 및 수행</span>
                    <p>{item.action}</p>
                  </div>
                  <div className="rationale-block">
                    <span className="block-label">이론적 근거</span>
                    <p>{item.rationale}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2026 Nursing Fairy. Created for Nurses in Wonju & Beyond.</p>
      </footer>
    </div>
  )
}

export default App
