<template>
    <footer class="mt-5 col-md-12 row m-0 bg-secondary align-items-center justify-content-between text-white p-5">
        <p class="col-sm-12 col-md-6">
            {{$i18n.t('usedDependencies')}}:
            <span v-for="dependency in Object.keys(packages.dependencies)" :key="dependency">
                <a class="link" :href="`https://www.npmjs.com/package/${dependency}`" target="_blank">{{dependency}}</a>
                <span v-if="dependency == 'jquery'">({{$i18n.t('usedForBootstrap')}})</span>,
            </span>
        </p>
        <p class="col-sm-12 col-md-6 text-right">
            <a class="ml-1 link text-light" href="http://cagataykula.com" target="_blank">Cagatay Kula</a>
        </p>
    </footer>
</template>

<script>
import packages from '@/../package.json'

export default {
    data() {
        return {
            packages
        }
    }
}
</script>

<style scoped lang="scss">
.link {
    color: #64a1e2;
}

@media (max-width: 767px) {
    p.text-right {
        text-align:center !important;
        margin-top: 15px;
    }
}
</style>