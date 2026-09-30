"""
Backend Integration & Unit Tests for FastAPI Microservice
"""
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"
    assert "FastAPI" in data["service"]

def test_realtime_ga4():
    response = client.get("/api/v1/realtime-ga4")
    assert response.status_code == 200
    data = response.json()
    assert "active_users_now" in data
    assert data["active_users_now"] >= 0
    assert len(data["top_active_pages"]) > 0

def test_generate_insights():
    payload = {
        "platforms": ["instagram", "tiktok", "ga4"],
        "start_date": "2026-08-01",
        "end_date": "2026-08-31"
    }
    response = client.post("/api/v1/generate-insights", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "success"
    assert len(data["insights"]) > 0
