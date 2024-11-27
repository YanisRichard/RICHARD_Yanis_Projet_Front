<script lang="ts" setup>
defineProps<{
  disabled?: boolean;
    variant?: "primary" | "outline" ;
}>();

</script>

<template>
    <button :class="{
        'button': true,
        '-outline': variant === 'outline',
        '-disabled': disabled ,
    }">
        <slot></slot>
    </button>
</template>

<style lang="scss">
.button {
    background: linear-gradient(to right, rgb(185, 101, 187), blue);
    color: $white;
    padding: rem(16px) rem(32px);
    border-radius: rem(48px);
    border: 1px solid transparent;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background: linear-gradient(to right, rgb(112, 60, 113), rgb(7, 7, 155));
    }

    &.-outline {
        background: transparent;
        color: $primaryColor;

        &:hover {
            color: $primaryDarkColor;
            border-color: $primaryDarkColor;
        }

        &.-disabled {
            background: transparent;
            color: $gray400;
            border-color: $gray100;
        }
    }

    &.-disabled {
        background: $gray100;
        border-color: $gray100;
        color: $gray400;
        cursor: not-allowed;
    }

    &.-small {
        padding: rem(8px) rem(16px);
    }
}
</style>
