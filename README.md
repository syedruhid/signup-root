# Login / Signup

React + TypeScript + Vite + Tailwind CSS. This app implements a signup flow.

## Tech stack

- **React 19** with function components
- **TypeScript** 
- **Vite** for dev server and production builds
- **Tailwind CSS v4**
- **Font Awesome** (icons), **MUI** / **Emotion** 
- **Scaffolding** -> MCP Tools

## Project layout

| PWD | Role |
|------|------|
| `src/App.tsx` | Shell layout, `StepsConfiguration` map, wires `useSignupFlow` hook to step components |
| `src/components/ui/` | Reusable Components (`Typography`, `Input`, `Loader`, `PopUp`, …) |
| `src/features/signUp/` | Signup Feature: types, hook, steps, signUp-specific components |
| `src/lib/utils.ts` | Shared helpers |
| `src/assets/` | Images and inline SVG React components |

Feature code is grouped under **`features/signUp`** so the signup coupled and can be moved to a router lateron.

## Architecture: signup flow

### Two layers of state: `data` and `draft`

- **`SignupData`** (`types.ts`) — committed profile: What will be sent to database before final User account creation. Fields like `password` reflect the final choice; `email` is hardcoded for demo purpsoe, as no screen or step was avaailble in figma

- **`SignupDraft`** — Temp copy before final network call. Users edit the draft on each step; **nothing is merged into `SignupData` until Contiue button is pressed**.

### `useSignupFlow`

Central hook (`src/features/signUp/hooks/useSignupFlow.ts`) owns:

### Step components
The componentes are seperated and single signUp route is broked down into multiple because its a high intent activity, Since there is a navigation between multiple routes involed here.
The Step to be rendered is simply decided based on the previous step performed or data already filled by the user in the order given in design.

## Enhancements

Added Proper regex wherever required, Last Name is Optional and if first Name is smaller than required length, Last Name becomes mandatory to acheive the min Length required.

Typography component defined for similar typography norms to be fdollowed throughout the application to maintain discplined and unifrom UI/UX.
Components seperated to maintain the same.

Framer-motion animations added to help with visual continuity in such high intent process while reducing a user's cognitive complexity/ perceivance on the flow.

The animations and progressbar are controlled by the central currentStep state. This will help in testing and also the ui state more deterministic, Further more if required same can be moved to a redux state by including rtx if the flow becomes more complex and need of network requests is included.

Didnt use redux for the assessment and only custom hook (useSignupFlow) to help keep the logic coupled with the UI, will help in porting this feature to anywehre required and any redux/zustand can be easily integrated.

Single Continue and Back button because Step Components (e.g., MobileNoStep) will only handle colllecting and validating data.
LoginContainer cares about Flow and Layout. It manages the overall state, the progress bar, and the navigation triggers. this helps in reducing navigation issues while actually keeping a single page in single flow but multi page process