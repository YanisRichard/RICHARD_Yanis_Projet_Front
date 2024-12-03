<script lang="ts" setup>
const filterValue = defineModel<string>('filter');

type Parfum = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: {
    src: string;
    alt: string;
  }
}

const parfums:Parfum[] = reactive([
  {
    id: 1,
    name: "Chanel No. 5",
    description: "Un parfum classique, intemporel, avec des notes florales de rose, de jasmin et de vanille.",
    price: 130,
    image: {
      src: "https://placehold.co/600x400",
      alt: "Flacon de parfum Chanel No. 5"
    }
  },
  {
    id: 2,
    name: "Dior Sauvage",
    description: "Un parfum frais et épicé avec des notes de bergamote, poivre et ambroxan.",
    price: 95,
    image: {
      src: "https://placehold.co/600x400",
      alt: "Flacon de parfum Dior Sauvage"
    }
  },
  {
    id: 3,
    name: "Tom Ford Black Orchid",
    description: "Un parfum oriental et floral, riche en orchidée noire, épices et bois précieux.",
    price: 180,
    image: {
      src: "https://placehold.co/600x400",
      alt: "Flacon de parfum Tom Ford Black Orchid"
    }
  },
  {
    id: 4,
    name: "Yves Saint Laurent Libre",
    description: "Un parfum audacieux alliant la lavande et la fleur d'oranger, avec des touches de musc et de vanille.",
    price: 110,
    image: {
      src: "https://placehold.co/600x400",
      alt: "Flacon de parfum Yves Saint Laurent Libre"
    }
  },
  {
    id: 5,
    name: "Hermès Terre d'Hermès",
    description: "Un parfum boisée et épicée, avec des notes de citron, poivre, cèdre et vétiver.",
    price: 140,
    image: {
      src: "https://placehold.co/600x400",
      alt: "Flacon de parfum Hermès Terre d'Hermès"
    }
  }
]);

const parfumsFiltered = computed(() => parfums.filter((parfum) => {
    return filterValue.value && parfum.name.includes(filterValue.value) 
}))

</script>


<template>
    <div class="c-parfum">
        <h2>Nos Parfums</h2>
        <div class="c-parfum__input">
            <input v-model="filterValue" type="text" placeholder="Rechercher un parfum">
        </div>
        <div class="c-parfum__list">
            <MyItem v-for="({ ...parfum }) in parfumsFiltered" :key="parfum.id" v-bind="parfum"/>

        </div>
    </div>
</template>

<style lang="scss">
.c-parfum {
    &__input {
        padding: rem(16px);
        * {
            width: 100%;
        }
    }
    &__list{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    }

    h2 {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
}
</style>