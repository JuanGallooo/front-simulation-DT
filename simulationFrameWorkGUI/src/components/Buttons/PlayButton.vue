<template>
    <div class="play-pause-skip-controls">
    <div @click="previous">
      <font-awesome-icon class="play-pause-skip-controls__icons" size="2x" icon="arrow-left" />
      
    </div>
    <div v-if="getNowPlayingStatus.isLoading || fakeLoading" class="spinner">
    </div>
    <div v-else-if="!isPlaying" @click="togglePlayPause">
      <font-awesome-icon :icon="['fas', 'play']" class="play-pause-skip-controls__icons" size="2x" /> 
    </div>
    <div v-else @click="togglePlayPause">
      <font-awesome-icon class="play-pause-skip-controls__icons" size="2x" icon="pause" />
    </div>
    <div @click="next">
      <font-awesome-icon class="play-pause-skip-controls__icons" size="2x" icon="arrow-right" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlayButton',
  data() {
    return {
      getNowPlayingStatus:{
        isLoading:false,
      },
      fakeLoading:false,
      isPlaying:false,
    };
  },
  methods: {
    play: function(){


    },
    pause: function(){


    },
    next: function(){


    },
    previous: function(){


    },
    togglePlayPause: function(){


    },
  },
  computed: {

  },
}
</script>

<style>

</style>