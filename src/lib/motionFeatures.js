// Only reachable through a dynamic import in App.jsx, so the bundler puts the
// animation features in their own chunk instead of the main bundle.
export { domAnimation as default } from "framer-motion";
