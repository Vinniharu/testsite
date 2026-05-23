try:
    from docx import Document
    from playwright.sync_api import sync_playwright
    print("libs-ok")
except Exception as e:
    print("libs-fail:", e)
