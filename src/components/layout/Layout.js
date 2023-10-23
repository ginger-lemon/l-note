import React from "react";

const Main = ({ children }) => {
    return (
        <main>
            {children}
        </main>
    )
}

const Aside = ({ children }) => {
    return (
        <aside>
            {children}
        </aside>
    )
}

const Layout = ({ mainChildren, asideChildren }) => {
    return (
        <div>
            <Main>{mainChildren}</Main>
            <Aside>{asideChildren}</Aside>
        </div>
    )
}

export default Layout