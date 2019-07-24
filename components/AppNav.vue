<template>
    <aside>
        <nav>
            <ul id="tabsUl">
                <li><nuxt-link to="/">About</nuxt-link></li>
                <li><nuxt-link to="/tool">Tool</nuxt-link></li>
                <li><nuxt-link to="/help">Help</nuxt-link></li>
                <br><br><br><br><br><br><br><br><br><br><br><br>
                <hr> 
                <div class="footer">
                    <p>Team leads:</p>
                    <p>Student contributors:</p>
                </div>
            </ul>    
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
    aside {
        grid-column: 1 / 3;
    }
    nav {
        background-color: hsl(216, 29%, 97%);
        margin: 50px 0 0 50px;
        ul {
            list-style: none;
            margin-bottom: 99%;
            li {
                a {
                    font-family: 'Roboto', sans-serif;
                    color: hsl(0, 0%, 50%);
                    font-size: 0.85em;
                    font-weight: 500;
                    text-decoration: none;
                    padding: 15px 10px;
                    display: block;
                    width: inherit;
                    height: auto;
                    &:hover {
                        background-color: #FFFFFF;
                    }
                    &.nuxt-link-exact-active {
                        color: hsl(210, 24%, 16%);
                        background-color: #FFFFFF;
                        border-left: 3px solid hsl(199, 84%, 55%);
                    }
                }
            }
        }
        .footer {
            margin-top: 20px;
            p {
                font-family: 'Roboto Mono', monospace;
                color: hsl(0, 0%, 50%);
                font-size: 0.75em;
                padding: 10px;
            }
        }
        hr {
            border: 0.5px solid hsla(0, 0%, 50%, 0.3);
            margin-top: 120px;
        }
    }
</style>

