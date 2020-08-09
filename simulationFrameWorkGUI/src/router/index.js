import Vue from 'vue';
import VueRouter from 'vue-router';
import canvas from '../components/Canvas/Canvas';

Vue.use(VueRouter)

const Foo = { template: '<div>foo</div>' }

const routes = [
    {path: '/', component: canvas },
    {path: '/project', component: Foo},
    {path: '/newproject', component: Foo}
];

export default new VueRouter({
    base: '/simulation/'
    ,routes
});