import { jsx as _jsx } from "react/jsx-runtime";
export default function Layout({ children }) {
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsx("main", { children: children }) }));
}
