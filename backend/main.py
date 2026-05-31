from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# CORS 설정 (React 연동을 위함)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

class PatientInfo(BaseModel):
    name: str = ""
    age: int = 0
    gender: str = ""
    disease_name: str
    blood_pressure: str = ""
    main_symptom: str = ""

# 데이터 로드
DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

@app.get("/")
def read_root():
    return {"message": "Nursing Guide API is running"}

@app.post("/api/interventions")
async def get_interventions(info: PatientInfo):
    data = load_data()
    # 입력받은 질병명이 포함된 항목 검색
    result = next((d for d in data["diseases"] if info.disease_name in d["name"]), None)
    
    if not result:
        raise HTTPException(status_code=404, detail="해당 질병에 대한 정보를 찾을 수 없습니다.")
    
    base_interventions = list(result["interventions"])
    
    # 혈압 기반 동적 중재 추가
    if info.blood_pressure:
        try:
            # 140/90 같은 형식에서 수축기 혈압 추출
            systolic = int(info.blood_pressure.split('/')[0])
            if systolic >= 140:
                base_interventions.insert(0, {
                    "action": f"현재 혈압({info.blood_pressure})이 높으므로 즉시 보고하고 안정을 유도합니다.",
                    "rationale": "고혈압으로 인한 뇌혈관 질환 등 급성 합병증을 예방하기 위함입니다."
                })
            elif systolic <= 90:
                base_interventions.insert(0, {
                    "action": f"현재 혈압({info.blood_pressure})이 낮으므로 쇼크 징후를 관찰하고 다리를 올려줍니다(Trendelenburg position).",
                    "rationale": "주요 장기로의 혈류 공급을 원활하게 하여 저혈압 쇼크를 방지하기 위함입니다."
                })
        except:
            pass # 형식 오류 시 스킵

    # 주증상 기반 동적 중재 추가
    if info.main_symptom:
        if "통증" in info.main_symptom:
            base_interventions.append({
                "action": f"호소하시는 통증('{info.main_symptom}') 강도를 NRS 척도로 사정하고 처방된 진통제를 투여합니다.",
                "rationale": "통증은 신체적 스트레스를 유발하며 회복을 지연시키므로 적절한 관리가 필요합니다."
            })
        if "호흡" in info.main_symptom or "숨" in info.main_symptom:
            base_interventions.append({
                "action": f"호흡곤란 완화를 위해 반좌위(Semi-Fowler's position)를 취해주고 산소 포화도를 측정합니다.",
                "rationale": "횡격막을 하강시켜 폐 확장을 돕고 산소 공급 상태를 확인하기 위함입니다."
            })

    # 간호 진단 동적 구성
    base_diagnosis = result["diagnosis"]
    dynamic_diagnosis = base_diagnosis
    
    # 혈압이 입력된 경우 진단에 반영
    if info.blood_pressure:
        dynamic_diagnosis += f" (현재 혈압: {info.blood_pressure})"
    
    # 주증상이 입력된 경우 진단에 반영 (관련된 요인/증거 추가)
    if info.main_symptom:
        if "관련된" in dynamic_diagnosis:
            dynamic_diagnosis += f", {info.main_symptom}"
        else:
            dynamic_diagnosis += f" 및 {info.main_symptom}와 관련된 상태"

    return {
        "patient": info,
        "symptoms": result.get("symptoms", "정보 없음"),
        "diagnosis": dynamic_diagnosis,
        "interventions": base_interventions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
