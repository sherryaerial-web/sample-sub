```markdown
# 🔄 StudioOS: Instructor Substitute & Leave Management

A self-serve dynamic scheduling and substitution management interface built for boutique studios and fitness centers.

![Live Demo](https://sherryaerial-web.github.io/sample-sub/)
![License: MIT](https://opensource.org/licenses/MIT)

## 📖 About The Project

This is the **Dynamic Workflow Manager** module of **StudioOS**. Managing a growing roster of instructors across a packed schedule of daily classes is a complex administrative challenge. 

This system eliminates manual scheduling friction by empowering instructors with a self-serve platform. It integrates a Google Forms backend with a chronological frontend dashboard, allowing instructors to seamlessly register leaves, claim open substitution slots, and track their claimed classes in real-time.

## ✨ Core Features

- **Self-Serve Leave Requests:** Instructors register their upcoming leaves via an integrated Google Forms backend, which instantly populates the internal database.
- **Dynamic Substitute Claiming:** Open slots are published automatically. Instructors can view available classes and claim substitutions with a single click.
- **Personalized Claim Dashboard:** Instructors can easily view a summary of the substitute classes they have successfully claimed.
- **Chronological Sorting Logic:** Ensures all upcoming classes and substitute needs are displayed in accurate chronological order.
- **Low-Code Google Sheets Database:** Acts as the central source of truth for studio admins without requiring complex server maintenance.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (Hosted on GitHub Pages)
- **Backend / API:** Google Forms & Google Apps Script (GAS)
- **Database:** Google Sheets

## 📸 Screenshots & Demo

https://uploads.tw/i/Z37cV2pIbK

## 🚀 Getting Started

To deploy this scheduling system for your own studio:

### 1. Database & Forms Setup
- Create a new Google Form for "Leave Requests".
- Link the Form to a Google Sheet (this will act as your database).
- Set up additional tabs for `Schedule` and `Claimed Substitutes`.

### 2. Backend Setup (Google Apps Script)
- Open your Google Sheet, navigate to `Extensions > Apps Script`.
- Copy the backend logic (from the `gas-backend/` folder in this repo) into the script editor.
- Deploy it as a **Web App** (Execute as: You, Who has access: Anyone).
- Copy the generated `Web App URL`.

### 3. Frontend Setup
- Clone this repository:
```

git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git

```
- Open the main JS file and replace the API configuration:
```

const API_URL = "YOUR_GAS_API_URL_HERE";

```
- Host the frontend on GitHub Pages.

## 🔒 Security Note
This is an open-source template. Do not commit actual Google Sheets IDs, real instructor names, or private API keys. Make sure to use placeholders (e.g., `Instructor A`, `Instructor B`) before pushing your code.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
``
