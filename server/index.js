import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import strip from "strip-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/assets/logo-cf0sCyoa.svg";
function Bottom() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-slate-400 bottom-8 inset-x-0 flex items-center justify-center max-h-8 md:max-h-12", children: /* @__PURE__ */ jsx(
    "a",
    {
      href: "https://github.com/briverse17/howtos/tree/content",
      target: "_blank",
      rel: "noopener noreferrer",
      children: /* @__PURE__ */ jsx(
        "img",
        {
          src: logo,
          className: "my-1 h-6 md:my-2 md:h-8 pointer-events-auto motion-safe:animate-logoSpin",
          alt: "https://github.com/briverse17/howtos/tree/content"
        }
      )
    }
  ) });
}
function Top() {
  return /* @__PURE__ */ jsx("header", { className: "bg-slate-800 top-0 inset-x-0 flex items-center justify-center max-h-8 md:max-h-12", children: /* @__PURE__ */ jsx("span", { className: "my-1 leading-6 md:my-2 md:leading-8 text-white font-mono font-bold text-2xl", children: "How to..." }) });
}
function MenuItem(props) {
  const text = /* @__PURE__ */ jsx(Markdown, { remarkPlugins: [strip], children: props.value });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "cursor-pointer px-2 py-1 rounded-l-lg",
      style: {
        backgroundColor: props.id === props.hovered || props.id === props.active ? "RGB(13, 17, 23)" : "white",
        color: props.id === props.hovered || props.id === props.active ? "white" : "black",
        fontWeight: props.id === props.active ? "bold" : "normal"
      },
      children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "text-left",
          onClick: () => props.onClick(props.id),
          onMouseEnter: () => props.onMouseEnter(props.id),
          onMouseLeave: () => props.onMouseLeave(null),
          children: text
        }
      )
    }
  );
}
function Menu(props) {
  useEffect(() => {
    if (!props.active) {
      props.setActive(Object.keys(props.articles)[0]);
    }
  }, [props]);
  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (props.active) {
          const response = await fetch(
            `https://raw.githubusercontent.com/briverse17/howtos/content/${props.active}`
          );
          const content = await response.text();
          if (!response.ok) {
            throw new Error(`Error: ${content}`);
          }
          props.setContent(content);
          props.setError(null);
        }
      } catch (error) {
        props.setError(error.message);
      }
    };
    fetchContent();
  }, [props]);
  return /* @__PURE__ */ jsxs("div", { className: "order-2 md:order-1 w-[96vw] md:w-1/5 h-[5vh] md:h-full mx-auto border-2 border-t-0 md:border-t-2 md:border-r-0 border-gray-300 rounded-b-2xl md:rounded-b-none md:rounded-l-2xl", children: [
    /* @__PURE__ */ jsx(
      "select",
      {
        className: "md:hidden w-full h-[5vh] bg-gray-300 p-2 rounded-b-xl md:rounded-b-none md:rounded-l-2xl cursor-pointer",
        value: props.active ? props.active : "",
        onChange: (e) => props.setActive(e.target.value),
        children: Object.entries(props.articles).map(([key, value]) => /* @__PURE__ */ jsx("option", { value: key, children: /* @__PURE__ */ jsx(
          MenuItem,
          {
            id: key,
            value,
            active: props.active,
            hovered: props.hovered,
            onClick: props.setActive,
            onMouseEnter: props.setHovered,
            onMouseLeave: props.setHovered
          }
        ) }, key))
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid pl-1 pb-1 gap-1 text-sm", children: Object.entries(props.articles).map(([key, value]) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      MenuItem,
      {
        id: key,
        value,
        active: props.active,
        hovered: props.hovered,
        onClick: props.setActive,
        onMouseEnter: props.setHovered,
        onMouseLeave: props.setHovered
      }
    ) }, key)) })
  ] });
}
function ViewerInner(props) {
  return /* @__PURE__ */ jsx("div", { className: "markdown-body px-4 md:px-8 py-2 min-h-full", children: /* @__PURE__ */ jsx(
    Markdown,
    {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw],
      remarkRehypeOptions: { passThrough: ["link"] },
      children: props.content
    }
  ) });
}
function Viewer(props) {
  return /* @__PURE__ */ jsx("div", { className: "order-1 md:order-2 w-[96vw] md:w-4/5 h-[95vh] md:h-full mx-auto rounded-t-2xl md:rounded-tl-none md:rounded-r-2xl md:border-y-2 md:border-r-2 md:border-gray-300 overflow-auto", children: /* @__PURE__ */ jsx(ViewerInner, { ...props }) });
}
function Container() {
  const [articles, setArticles] = useState(Object());
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/briverse17/howtos/content/contents.json`
        );
        const content2 = await response.json();
        if (!response.ok) {
          throw new Error(`Error: ${content2}`);
        }
        setArticles(content2);
        setError(null);
      } catch (error2) {
        setError(error2.message);
      }
    };
    fetchArticles();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "container flex flex-col md:flex-row mx-auto h-[90vh] md:h-[89vh]", children: [
    /* @__PURE__ */ jsx(
      Menu,
      {
        articles,
        active,
        hovered,
        setActive,
        setHovered,
        setContent,
        setError
      }
    ),
    /* @__PURE__ */ jsx(Viewer, { content: content ? content : error })
  ] });
}
function Home() {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between h-screen", children: [
    /* @__PURE__ */ jsx(Top, {}),
    /* @__PURE__ */ jsx(Container, {}),
    /* @__PURE__ */ jsx(Bottom, {})
  ] });
}
const meta = () => {
  return [
    { title: "briverse17: How to..." },
    { name: "description", content: "How to do THAT" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Home, {}) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-7bQylq13.js", "imports": ["/assets/jsx-runtime-d4vcKfGz.js", "/assets/components-B6_jwjI6.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-D8LDXIrP.js", "imports": ["/assets/jsx-runtime-d4vcKfGz.js", "/assets/components-B6_jwjI6.js"], "css": ["/assets/root-3N4zGq5L.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CfnoQBVU.js", "imports": ["/assets/jsx-runtime-d4vcKfGz.js"], "css": ["/assets/_index-OF_lOPs-.css"] } }, "url": "/assets/manifest-a1aa53b8.js", "version": "a1aa53b8" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "unstable_singleFetch": false, "unstable_fogOfWar": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
