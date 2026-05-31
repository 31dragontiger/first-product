import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors())

const data = {
  "diseases": [
    {
      "name": "고혈압",
      "symptoms": "두통, 어지러움, 피로감, 시력 저하, 코피",
      "diagnosis": "높은 혈압과 관련된 비효과적 뇌조직 관류의 위험",
      "interventions": [
        {
          "action": "주기적으로 혈압을 측정하고 기록합니다.",
          "rationale": "혈압 변화 추이를 관찰하여 합병증을 조기 발견하고 투약 효과를 판정하기 위함입니다."
        },
        {
          "action": "저염식, 저지방 식이의 중요성을 교육합니다.",
          "rationale": "나트륨 섭취 제한은 체액 저류를 줄여 혈압 하강을 돕습니다."
        },
        {
          "action": "적절한 휴식과 스트레스 관리 방법을 지도합니다.",
          "rationale": "교감신경계 활성화를 억제하여 혈관 수축을 방지합니다."
        }
      ]
    },
    {
      "name": "당뇨",
      "symptoms": "다뇨, 다음, 다식, 체중 감소, 피로, 시야 흐림",
      "diagnosis": "불충분한 혈당 관리와 관련된 불안정한 혈당 수치의 위험",
      "interventions": [
        {
          "action": "매 끼니 전과 취침 전 혈당을 체크합니다.",
          "rationale": "인슐린 투여량 조절 및 저혈당/고혈당 예방을 위한 기본 데이터입니다."
        },
        {
          "action": "규칙적인 식사와 처방된 칼로리 준수를 강조합니다.",
          "rationale": "일정한 탄수화물 섭취는 혈당 수치의 급격한 변동을 막아줍니다."
        },
        {
          "action": "발 관리의 중요성과 상처 확인 방법을 교육합니다.",
          "rationale": "당뇨병성 말초혈관 질환으로 인한 감각 저하와 치유 지연을 방지하기 위함입니다."
        }
      ]
    },
    {
      "name": "폐렴",
      "symptoms": "기침, 가래, 고열, 오한, 호흡곤란, 흉통",
      "diagnosis": "폐포-모세혈관막의 변화와 관련된 가스교환 장애",
      "interventions": [
        {
          "action": "적어도 2시간마다 체위 변경을 실시하고 심호흡을 권장합니다.",
          "rationale": "폐 확장을 돕고 기관지 분비물 배출을 용이하게 하여 가스 교환을 증진시킵니다."
        },
        {
          "action": "수분 섭취를 권장합니다 (금기가 없는 경우).",
          "rationale": "분비물을 묽게 하여 객담 배출을 원활하게 합니다."
        },
        {
          "action": "처방된 항생제와 거담제를 정확한 시간에 투여합니다.",
          "rationale": "감염원을 제거하고 증상을 완화하여 회복을 돕습니다."
        }
      ]
    },
    {
      "name": "고지혈증",
      "symptoms": "초기 증상 없음, 황색종, 각막 혼탁 (심할 경우)",
      "diagnosis": "부적절한 식이 습관과 관련된 영양 불균형",
      "interventions": [
        {
          "action": "포화지방과 콜레스테롤이 적은 식단을 권장합니다.",
          "rationale": "혈중 지질 농도를 낮추어 동맥경화 위험을 감소시킵니다."
        },
        {
          "action": "규칙적인 유산소 운동(걷기, 조깅 등)을 독려합니다.",
          "rationale": "HDL 콜레스테롤을 높이고 체중 조절을 돕습니다."
        }
      ]
    },
    {
      "name": "심부전",
      "symptoms": "호흡곤란, 부종, 피로, 누웠을 때 심해지는 기침",
      "diagnosis": "심장 기능 저하와 관련된 체액 과다",
      "interventions": [
        {
          "action": "매일 같은 시간에 체중을 측정합니다.",
          "rationale": "갑작스러운 체중 증가는 체액 저류의 지표가 됩니다."
        },
        {
          "action": "염분과 수분 섭취를 제한합니다.",
          "rationale": "심장의 부담을 줄이고 부종을 완화하기 위함입니다."
        }
      ]
    },
    {
      "name": "만성 폐쇄성 폐질환 (COPD)",
      "symptoms": "만성 기침, 호흡곤란, 쌕쌕거림(천명음), 가슴 답답함",
      "diagnosis": "기도의 만성적인 협착과 관련된 비효과적 호흡 양상",
      "interventions": [
        {
          "action": "입술 오므리기 호흡(Pursed-lip breathing)을 교육합니다.",
          "rationale": "기도 압력을 유지하여 폐포의 허탈을 방지하고 이산화탄소 배출을 돕습니다."
        },
        {
          "action": "금연을 강력히 권고하고 금연 프로그램을 소개합니다.",
          "rationale": "폐 기능의 추가 손상을 막는 가장 중요한 방법입니다."
        }
      ]
    },
    {
      "name": "천식",
      "symptoms": "발작적 기침, 호흡곤란, 천명음, 가슴 압박감",
      "diagnosis": "기관지 경련 및 과다한 분비물과 관련된 비효과적 기도 청결",
      "interventions": [
        {
          "action": "알레르기 유발 물질(먼지, 진드기 등)을 피하도록 교육합니다.",
          "rationale": "천식 발작의 원인을 제거하여 증상 악화를 예방합니다."
        },
        {
          "action": "증상 발생 시 흡입기(속효성 베타-2 자극제) 사용법을 지도합니다.",
          "rationale": "기도를 즉각적으로 확장시켜 호흡곤란을 완화합니다."
        }
      ]
    },
    {
      "name": "뇌졸중",
      "symptoms": "편마비, 안면 마비, 언어 장애, 심한 두통, 어지러움",
      "diagnosis": "뇌혈류 감소와 관련된 뇌조직 관류 저하의 위험",
      "interventions": [
        {
          "action": "활력징후와 신경학적 상태를 면밀히 관찰합니다.",
          "rationale": "재출혈이나 뇌압 상승 징후를 조기에 발견하기 위함입니다."
        },
        {
          "action": "마비된 쪽의 관절 운동(ROM)을 도와줍니다.",
          "rationale": "관절 강직을 예방하고 근육 기능을 유지합니다."
        }
      ]
    },
    {
      "name": "위궤양",
      "symptoms": "상복부 통증, 속 쓰림, 구토, 흑색변(심할 경우)",
      "diagnosis": "위산 분비 자극 및 점막 손상과 관련된 급성 통증",
      "interventions": [
        {
          "action": "자극적인 음식(맵고 짠 것), 카페인, 술을 피하도록 합니다.",
          "rationale": "위산 분비를 자극하여 점막 손상을 악화시키는 요인을 제거합니다."
        },
        {
          "action": "처방된 제산제나 위점막 보호제를 식전에 투여합니다.",
          "rationale": "위산을 중화시키고 궤양 부위를 보호하여 통증을 완화합니다."
        }
      ]
    },
    {
      "name": "신부전",
      "symptoms": "소변량 감소, 부종, 가려움증, 피로, 오심",
      "diagnosis": "신장 여과 기능 저하와 관련된 체액 불균형",
      "interventions": [
        {
          "action": "저단백, 저칼륨, 저인 식이를 교육합니다.",
          "rationale": "대사 노폐물과 전해질의 축적을 막아 신장의 부담을 줄입니다."
        },
        {
          "action": "수분 섭취량을 엄격히 제한하고 기록합니다.",
          "rationale": "체액 과부하와 부종, 고혈압을 조절하기 위함입니다."
        }
      ]
    },
    {
      "name": "심근경색",
      "symptoms": "가슴 압박감, 쥐어짜는 듯한 통증, 식은땀, 호흡곤란",
      "diagnosis": "심근의 허혈 및 산소 공급 부족과 관련된 급성 통증",
      "interventions": [
        {
          "action": "절대 안정을 유지하고 산소를 투여합니다.",
          "rationale": "심근의 산소 요구량을 줄이고 공급을 늘려 통증을 완화합니다."
        },
        {
          "action": "니트로글리세린 등 처방된 약물을 투여합니다.",
          "rationale": "관상동맥을 확장시켜 혈류를 개선합니다."
        }
      ]
    },
    {
      "name": "간경화",
      "symptoms": "황달, 복수, 피로, 식도 정맥류, 가려움증",
      "diagnosis": "혈장 단백질 합성 감소 및 문맥압 상승과 관련된 체액 과다",
      "interventions": [
        {
          "action": "복부 둘레를 매일 측정하고 부종 여부를 확인합니다.",
          "rationale": "복수 및 체액 저류의 정도를 모니터링하기 위함입니다."
        },
        {
          "action": "저염 식이를 제공하고 수분 섭취를 조절합니다.",
          "rationale": "나트륨 저류로 인한 복수 형성을 최소화합니다."
        }
      ]
    }
  ]
}

app.get('/', (c) => c.json({ message: 'Nursing Guide Worker is running' }))

app.post('/api/interventions', async (c) => {
  const info = await c.req.json()
  const result = data.diseases.find(d => info.disease_name.includes(d.name))

  if (!result) {
    return c.json({ detail: "해당 질병에 대한 정보를 찾을 수 없습니다." }, 404)
  }

  let interventions = [...result.interventions]

  if (info.blood_pressure) {
    try {
      const systolic = parseInt(info.blood_pressure.split('/')[0])
      if (systolic >= 140) {
        interventions.unshift({
          action: `현재 혈압(${info.blood_pressure})이 높으므로 즉시 보고하고 안정을 유도합니다.`,
          rationale: "고혈압으로 인한 뇌혈관 질환 등 급성 합병증을 예방하기 위함입니다."
        })
      } else if (systolic <= 90) {
        interventions.unshift({
          action: `현재 혈압(${info.blood_pressure})이 낮으므로 쇼크 징후를 관찰하고 다리를 올려줍니다.`,
          rationale: "주요 장기로의 혈류 공급을 원활하게 하여 저혈압 쇼크를 방지하기 위함입니다."
        })
      }
    } catch (e) {}
  }

  if (info.main_symptom) {
    if (info.main_symptom.includes("통증")) {
      interventions.push({
        action: `호소하시는 통증('${info.main_symptom}') 강도를 NRS 척도로 사정하고 처방된 진통제를 투여합니다.`,
        rationale: "통증은 신체적 스트레스를 유발하며 회복을 지연시키므로 적절한 관리가 필요합니다."
      })
    }
    if (info.main_symptom.includes("호흡") || info.main_symptom.includes("숨")) {
      interventions.push({
        action: `호흡곤란 완화를 위해 반좌위(Semi-Fowler's position)를 취해주고 산소 포화도를 측정합니다.`,
        rationale: "횡격막을 하강시켜 폐 확장을 돕고 산소 공급 상태를 확인하기 위함입니다."
      })
    }
  }

  let diagnosis = result.diagnosis
  if (info.blood_pressure) {
    diagnosis += ` (현재 혈압: ${info.blood_pressure})`
  }
  if (info.main_symptom) {
    diagnosis += diagnosis.includes("관련된") ? `, ${info.main_symptom}` : ` 및 ${info.main_symptom}와 관련된 상태`
  }

  return c.json({
    patient: info,
    symptoms: result.symptoms,
    diagnosis: diagnosis,
    interventions: interventions
  })
})

export default app
