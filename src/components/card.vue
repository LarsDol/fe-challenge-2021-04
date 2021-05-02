<template>
    <a
        class="fe-card"
        :href="url"
        :style="{
            'border-radius': borderRadius,
            'font-size': `${ 1 * (width / 474) }px`
        }"
        :data-color-theme="colorTheme"
    >
        <div
            class="fe-card__body"
            ref="body"
            :style="{
                'padding': padding
            }"
        >
            <h2
                class="fe-card__title"
                :style="{
                    'font-size': titleFontSize,
                    'margin-bottom': titleMarginBottom
                }"
            >
                {{ title }}
            </h2>

            <ul
                class="fe-card__list"
                :style="{
                    'font-size': listFontSize
                }"
            >
                <li v-if="technologiesString">
                    <database-icon
                        :style="{
                            'width': iconWidth,
                            'margin': iconMargin
                        }"
                    /> {{ technologiesString }}
                </li>
                <li
                    v-if="daysToUpdate !== null"
                    :data-severity="updateSeverity"
                >
                    <clock-icon
                        :style="{
                            'width': iconWidth,
                            'margin': iconMargin
                        }"
                    /> <span>{{ daysToUpdate }}</span> {{ daysToUpdateString }}
                </li>
            </ul>

            <div class="fe-card__assignees">
                <assignees :assignees="assignees" />
            </div>
        </div>

        <div class="fe-card__decoration-ball1" />
        <div class="fe-card__decoration-ball2" />
        <div class="fe-card__decoration-ball3" />

        <card-background class="fe-card__background" />
    </a>
</template>

<script>
import Assignees from './assignees.vue';
import CardBackground from './background.vue';
import ClockIcon from './icons/clock.vue';
import DatabaseIcon from './icons/database.vue';

export default {
    components: {
        Assignees,
        CardBackground,
        ClockIcon,
        DatabaseIcon
    },

    props: {
        url: {
            type: String,
            default: '#'
        },
        title: {
            type: String,
            default: null
        },
        daysToUpdate: {
            type: Number,
            default: null
        },
        technologies: {
            type: Array,
            default() { return []; }
        },
        colorTheme: {
            type: [String, Number],
            default: 0
        },
        assignees: {
            type: Array,
            default() { return []; }
        }
    },

    data() {
        return {
            width: null
        };
    },

    computed: {
        titleFontSize() {
            const fontSize = Math.round(this.width * 0.088);

            return `${fontSize}px`;
        },

        titleMarginBottom() {
            const marginBottom = Math.round(this.width * 0.05);

            return `${marginBottom}px`;
        },

        listFontSize() {
            const fontSize = Math.round(this.width * 0.0422);

            return `${fontSize}px`;
        },

        iconMargin() {
            const marginRight = Math.round(this.width * 0.04);

            return `0 ${marginRight}px 0 0`;
        },

        iconWidth() {
            const width = Math.round(this.width * 0.04);

            return `${width}px`;
        },

        borderRadius() {
            const radius = Math.round(this.width * 0.1054);

            return `${radius}px`;
        },

        padding() {
            const paddingY = Math.round(this.width * 0.1793);
            const paddingX = Math.round(this.width * 0.1118);

            return `${paddingY}px ${paddingX}px`;
        },

        technologiesString() {
            return this.technologies.join(' & ');
        },

        daysToUpdateString() {
            if (this.daysToUpdate === null) {
                return false;
            }

            if (this.daysToUpdate === 1) {
                return ' day to update';
            }

            return ' days to update';
        },

        updateSeverity() {
            if (this.daysToUpdate > 7) {
                return 'safe';
            }

            if (this.daysToUpdate > 0 && this.daysToUpdate <= 7) {
                return 'warning';
            }

            return 'error';
        }
    },

    mounted() {
        if (window && document) {
            window.addEventListener('resize', this.updateDimensions);
            this.updateDimensions();
        }
    },

    methods: {
        updateDimensions() {
            if (!this.$refs.body) {
                return;
            }

            this.width = this.$refs.body.offsetWidth;
        }
    }
};
</script>

<style lang="less" src="./card.less" scoped></style>
