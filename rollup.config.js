import rollupTypescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import builtins from "rollup-plugin-node-builtins";
import sourcemaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./src/index.tsx",
  external: ["react", "react-dom", "stream", "prop-types"],
  plugins: [
    builtins(),
    terser(),
    {
      name: "replace moment imports",
      transform: (code) => ({
        code: code.replace(/import\s*\*\s*as\s*moment/g, "import      moment"),
        map: null,
      }),
    },
    rollupTypescript({
      tsconfigDefaults: {
        sourceMap: true,
      },
    }),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        react: Object.keys(require("react")),
        "react-is": Object.keys(require("react-is")),
        // "node_modules/react/index.js": [
        //   "cloneElement",
        //   "createContext",
        //   "Component",
        //   "createElement",
        //   "PropTypes",
        // ],
        "node_modules/react-dom/index.js": ["render", "hydrate"],
        // "node_modules/react-is/index.js": [
        //   "isElement",
        //   "isValidElementType",
        //   "ForwardRef",
        // ],
      },
    }),
    resolve(),
    sourcemaps(),
  ],
  output: [
    {
      file: "./dist/index.umd.js",
      format: "umd",
      name: "umd",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDom",
        stream: "stream",
        "prop-types": "PropTypes",
        "react-router": "Link",
        "react-transition-group": "ReactTransitionGroup",
        "styled-component": "styled",
        "bootstrap-styled": "Jumbotron",
        classnames: "cn",
        "jalali-moment": "moment",
      },
    },
    {
      file: "./dist/index.js",
      format: "cjs",
      name: "umd",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDom",
        stream: "stream",
        "prop-types": "PropTypes",
        "react-router": "Link",
        "react-transition-group": "ReactTransitionGroup",
        "styled-component": "styled",
        "bootstrap-styled": "Jumbotron",
        classnames: "cn",
        "jalali-moment": "moment",
      },
    },
    {
      file: "./dist/index.module.js",
      format: "es",
      name: "es",
      sourcemap: true,
      globals: {
        react: "React",
        "react-dom": "ReactDom",
        stream: "stream",
        "prop-types": "PropTypes",
        "react-router": "Link",
        "react-transition-group": "ReactTransitionGroup",
        "styled-component": "styled",
        "bootstrap-styled": "Jumbotron",
        classnames: "cn",
        "jalali-moment": "moment",
      },
    },
  ],
};
