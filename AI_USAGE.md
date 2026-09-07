# AI Usage Documentation

## AI Tools Used

* ChatGPT
* GitHub Copilot

## AI Development Workflow

AI tools were used as development assistants throughout the project development process.

Main usage areas:

* Debugging frontend and backend issues
* Reviewing API contracts
* Finding frontend and backend mismatches
* Code structure analysis
* Error diagnosis
* Improving implementation quality

Development workflow:

1. Implement a feature.
2. Test the functionality.
3. Analyze issues with AI assistance.
4. Verify AI suggestions against the existing codebase.
5. Apply only confirmed fixes.
6. Test the updated implementation again.

AI-generated suggestions were reviewed before implementation.

## How AI Was Instructed

AI was instructed to:

* Inspect existing code before making changes.
* Follow the current project architecture.
* Avoid assumptions about APIs, routes, and database structure.
* Modify only the required area.
* Preserve existing working functionality.
* Verify changes after implementation.

Example instruction:

> Inspect the existing implementation first. Do not assume missing requirements. Fix only the confirmed issue. Do not modify unrelated features. Verify the result after changes.

## Bugs Found and Fixed

### 1. CSS Loading Issue

**Problem:**
Frontend styling was not loading correctly.
Investigation showed that CSS files existed in an incorrect nested directory structure and were not included through the expected import path.

**Fix:**
The CSS import structure was corrected and invalid references were removed.

**Result:**
Frontend styling loaded correctly and the UI layout worked properly.

### 2. Registration Flow Issue

**Problem:**
The registration page called a function that was not available in the authentication context.
The request failed before reaching the backend.

**Fix:**
The registration flow was connected with the existing registration API function.

**Result:**
Registration worked correctly.

### 3. Comment Rendering Issue

**Problem:**
Frontend expected the comment field:
`content`
but backend returned:
`body`

**Fix:**
Frontend rendering was updated to use the actual backend response field.

**Result:**
Comments displayed correctly.

### 4. Profile API Contract Issue

**Problem:**
Frontend profile requests did not match the existing backend profile route structure.

**Fix:**
Frontend API usage was updated according to the existing backend implementation.

**Result:**
Profile loading and updating worked correctly.

### 5. Broken Media Rendering Issue

**Problem:**
Posts without media attempted to render image elements, causing broken image icons.

**Fix:**
Media rendering was updated according to media type:

* Image → image element
* Video → video player
* No media → no media element

**Result:**
Text posts, image posts, and video posts render correctly.

## Personal Review and Validation

AI suggestions were not accepted blindly. I rejected suggestions that changed unrelated files or introduced assumptions without checking existing API contracts.

The following areas were manually reviewed:

* Backend routes
* API response structures
* Frontend API integration
* Authentication flow
* CSS loading behavior
* Component behavior

Validation performed:

* Frontend lint checks
* Frontend production build
* Manual feature testing
* API contract comparison

## Final Note

AI was used as a development assistant for debugging, implementation support, and code review.
All important changes were verified against the existing project implementation before being applied.