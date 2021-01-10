export default {

  // home is a section without childs, set as an empty array
  home: [],

  project: [

    {
      type: 'title',
      txt: 'Proyectos',
      icon: 'fas fa-folder context-menu__title-icon',
    },
    {
      type: 'link',
      txt: 'Inicio',
      link: '/',
    },
    {
      type: 'link',
      txt: 'Nuevo proyecto',
      link: '/',
    },
    {
      type: 'link',
      txt: 'Guardar proyecto',
      link: '/',
    }
  ],

  configuration: [

    {
      type: 'title',
      txt: 'Configuration',
      icon: 'fas fa-wrench context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'List Customers',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'List Contacts',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'List Newsletters',
      link: '/page',
    },

  ],

  analysis: [

    {
      type: 'title',
      txt: 'My Account',
      icon: 'far fa-chart-bar context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Change Password',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'Change Settings',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'Logout',
      link: '/page',
    },

    {
      type: 'title',
      txt: 'Change Subscription',
      icon: 'fa fa-credit-card context-menu__title-icon',
    },

    {
      type: 'link',
      txt: 'Plans',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'Payment Settings',
      link: '/page',
    },

    {
      type: 'link',
      txt: 'Payment History',
      link: '/page',
    },

  ],

};
