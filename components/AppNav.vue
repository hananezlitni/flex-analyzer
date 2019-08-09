<template>
    <aside>
        <nav>
            <ul class="navigation__list">
                <li class="navigation__list__item"><nuxt-link to="/">Documentation</nuxt-link></li>
                <li class="navigation__list__item"><nuxt-link to="/web-tool">On-screen Tool</nuxt-link></li>
                <li class="navigation__list__item"><nuxt-link to="/import-tool">Import a Structure</nuxt-link></li>
            </ul>    
        </nav>
    </aside>
</template>

<style lang="scss" scoped>
    aside {
        grid-column: 1 / 3;
    }
    nav {
        background-color: inherit;
        margin: 20px 0 0 50px;
    }
    .navigation__list {
        list-style: none;
    }
    .navigation__list__item {
        a {
            font-family: $roboto;
            color: $gray-color;
            font-size: 0.9em;
            font-weight: 400;
            text-decoration: none;
            padding: 15px 10px;
            display: block;
            width: inherit;
            height: auto;
            &:hover {
                background-color: hsla(203, 100%, 27%, 0.15);
            }
            &.nuxt-link-exact-active {
                color: $font-color;
                background-color: hsla(199, 84%, 55%, 0.15);
                border-left: 3px solid $accent-color;
            }
        }
    }
</style>

