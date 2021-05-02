<template>
    <ul
        v-if="assignees && assignees.length"
        class="assignees"
    >
        <li
            v-for="(assignee, index) in assignees"
            :key="index"
        >
            <img
                :src="assignee.avatar"
                :alt="assignee.name"
                :title="assignee.name"
                width="60"
                height="60"
                loading="lazy"
            >
        </li>
    </ul>
</template>


<script>
export default {
    props: {
        assignees: {
            type: Array,
            default() { return []; }
        }
    }
};
</script>

<style lang="less" src="./assignees.less" scoped></style>
