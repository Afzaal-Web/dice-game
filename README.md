# 🎲 Dice Game

This is a JavaScript-based Dice Game where users roll 5 dice up to 3 times per round and choose the best scoring option based on the outcome. The game runs for 6 rounds and tracks scores across various categories like three-of-a-kind, four-of-a-kind, full house, small and large straights.

---

## 📋 Features

- 🎲 Roll 5 dice per round (up to 3 times)
- ✔️ Choose a score category based on the rolled values
- ♻️ Detects:
  - Three-of-a-Kind
  - Four-of-a-Kind
  - Full House
  - Small Straight (4 consecutive numbers)
  - Large Straight (5 consecutive numbers)
- 📝 Score history is shown per round
- 🧮 Calculates total score
- ⏹ Ends after 6 rounds and displays the final score
- 📜 Toggle button to show/hide game rules

---

## 🛠️ Tech Stack

- **HTML**
- **CSS**
- **JavaScript (Vanilla)**

---

## 🚀 How to Use

1. Clone or download the project files.
2. Open the `index.html` file in your browser.
3. Click **"Roll Dice"** to generate values.
4. Select a scoring option that fits the roll.
5. Click **"Keep Score"** to lock in your choice and proceed to the next round.
6. After 6 rounds, your final score is shown.

---

## 🔄 Game Logic Overview

- **Rolling Dice**: Randomly generates 5 dice values between 1–6.
- **Scoring Detection**:
  - **Three-of-a-kind**: 3 matching values
  - **Four-of-a-kind**: 4 matching values
  - **Full House**: 3 of one value + 2 of another
  - **Small Straight**: 4 consecutive values (e.g., `2-3-4-5`)
  - **Large Straight**: 5 consecutive values (e.g., `1-2-3-4-5`)
- **Each category** has a corresponding radio button input
- **Score History** logs selections made per round
- **Total Score** updates in real-time

---

## 📂 File Structure

