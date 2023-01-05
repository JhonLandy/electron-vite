<template>
    <v-card
        height="100%"
        class="override"
    >
        <v-layout>
            <v-navigation-drawer
                theme="dark"
                rail
                permanent
                absolute
            >
                <v-list-item
                    nav
                    prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg"
                />

                <v-divider />

                <v-list
                    density="compact"
                    nav
                >
                    <v-list-item
                        prepend-icon="mdi-view-dashboard"
                        value="dashboard"
                    />

                    <v-list-item
                        prepend-icon="mdi-forum"
                        value="messages"
                    />
                </v-list>
            </v-navigation-drawer>

            <v-navigation-drawer
                permanent
                absolute
            >
                <v-list>
                    <v-list-item
                        title="聊天"
                        value="home"
                    />

                    <v-list-item
                        title="资料"
                        value="contacts"
                    />

                    <v-list-item
                        title="设置"
                        value="settings"
                    />
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 300px" />
        </v-layout>
    </v-card>
</template>
<style lang="sass" scoped>
.override
    border-radius: 0
</style>
