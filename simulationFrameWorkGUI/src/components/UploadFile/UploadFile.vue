<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div
        class="progress-bar progress-bar-info progress-bar-striped"
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: progress + '%' }"
      >{{ progress }}%</div>
    </div>
    <label class="btn btn-default">
      <input type="file" ref="file" @change="selectFile" />
    </label>
    <v-btn color="primary" :disabled="!selectedFiles" @click="upload">Upload</v-btn>
    <div class="alert alert-light" role="alert">{{ message }}</div>
  </div>
</template>

<script>
import UploadService from "../../helpers/UploadFilesService";
export default {
  name: "upload-files",
  data() {
    return {
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      })
        .then((response) => {
          this.message = response.data.message;
          return UploadService.getFiles();
        })
        .then((files) => {
          this.fileInfos = files.data;
        })
        .catch(() => {
          this.progress = 0;
          this.message = "Could not upload the file!";
          this.currentFile = undefined;
        });

      this.selectedFiles = undefined;
    },
  },
};
</script>

<style>
</style>