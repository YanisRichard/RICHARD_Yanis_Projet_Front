<script lang="ts" setup>
defineProps<{
    name: string ;
    description: string;
    price: number;
    image: {
        url: string;
        src: string; 
    }
}>();

</script>

<template>
    <div class="c-item">
        <img class="c-item__image -blue" :src="image.url" :alt="image.alt" >
        <p class="c-item__title">
            {{ name }}
        </p>
        <p>
            {{ description }}
        </p>
        <p>
            {{ price }} €
        </p>
        <button class="button c-item__button">Ajouter au panier</button>
    </div>
</template>


<style lang="scss">
.c-item {
    $self: &;
    padding: rem(16px);
    border: 1px solid $gray100;

    @each $color, $value in $colors {
        &.-#{$color} #{$self}__image {
            border-color: $value;
        }

        &.-#{$color} #{$self}__button {
            background: $value;
            border-color: $value;
        }
    }

    &:hover {
        #{$self}__title {
            color: $primaryColor;
        }
    }

    &__title {
        font-family: Georgia, 'Times New Roman', Times, serif;
        font-size: rem(24px);
        color: $gray800;
    }

    &__image {
        border-bottom: 4px solid $gray400;
    }

    &__button {
        margin-top: rem(16px);
    }
}
</style>