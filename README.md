# 🧠 VYB AI - Smart Nutrition Estimator

A resilient nutrition estimation system built in **Python + FastAPI** that estimates nutritional values of **home-cooked Indian meals** — even with **partial, messy, or ambiguous data**.

---

## 🌐 Hosted URLs

- 🔗 **Frontend** (React): https://frontend-smartnutri.vercel.app/
- 🔗 **Backend API** (FastAPI on Railway): https://back-smart-production.up.railway.app/

---

## 🚀 Goal

> Given a **dish name**, return **per-serving nutrition** (e.g., per 1 katori) using real-world data, household measurements, and reasoning — even if ingredient data is incomplete or dish names are vague.

---

## 🔧 Features

- ✅ LLM-powered ingredient extraction (Gemini 1.5 Flash)
- ✅ Fuzzy matching of ingredients to nutrition database
- ✅ Unit-to-gram conversion based on ingredient-specific densities
- ✅ Graceful fallback for missing data and messy user input
- ✅ Nutrition for **standard household portions** (e.g., 1 katori)
- ✅ Streamlit CLI for quick testing and visualization
- ✅ Modular backend with clean API and logs

---

## ⚙️ How It Works

### 📥 Input

- A dish name like `Paneer Butter Masala` or `Mixed Veg Sabzi`

### 🧬 Processing Pipeline

1. **LLM Ingredient Extraction**
2. **Normalization** (lowercase, remove adjectives)
3. **Ingredient Matching** (fuzzy ratio ≥ 80%)
4. **Unit Conversion** (e.g., tbsp → grams)
5. **Nutrition Totals**
6. **Scaling to Per-Serving**
7. **Logs of assumptions** (e.g., missing match)

---

## 🧪 Edge Case Handling

| Dish                    | Issue                          | Handling                                        |
|-------------------------|--------------------------------|-------------------------------------------------|
| Jeera Aloo              | No quantity, spelling variants | Fuzzy match + avg qty                           |
| Mixed Veg               | No fixed ingredients           | Uses LLM guess with uncertainty logging         |
| Paneer Curry + Capsicum | Ambiguous units                | Contextual estimate using density               |
| Gobhi Sabzi             | Unclear category               | Defaults to Veg Dry                             |
| Chana Masala            | Missing nutrition entry        | Logs warning, omits or estimates contribution   |

---

## 🧠 Manual Reasoning Questions--> PART 3

 Map 'lightly roasted jeera powder' to a nutrition entry. Why?

A: It is mapped to Cumin seed, dried because:

Jeera is the same as cumin.

Roasting doesn't change how healthy it is. is it?

Powder just means the ingredient is ground, not changed.



### Q: Dish weight = 700g cooked, raw = 950g

Loss Ratio is  (950 - 700) / 950 = 26.3% (approx)

 for 180g serving it will be 


scaled_nutrition = (180 / 700) * total_nutrition  

also for carb= 180/700 *(carbof 700g)
