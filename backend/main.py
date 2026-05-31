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
        raise HTTPException(status_code=404, detail="해당 질병에 대한 정보를 찾을 수 없습니다. (고혈압, 당뇨, 폐렴 중 입력해보세요)")
    
    return {
        "patient": info,
        "diagnosis": result["diagnosis"],
        "interventions": result["interventions"]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
