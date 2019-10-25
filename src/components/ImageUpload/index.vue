<template>
  <div>
    <div class="img-upload">
      <img v-if="imgUrl" :src="imgUrl" class="upload-img" alt="" style="height:180px;">
      <div v-if="imgUrl" class="icon-box">
        <span class="upload-img-handle-preview" @click="handlePicturePreview">
          <i class="el-icon-zoom-in" />
        </span>
        <span class="upload-img-remove-pic" @click="handleRemovePic">
          <i class="el-icon-delete" />
        </span>
      </div>
      <div v-if="!imgUrl" class="upload-img-handle" @click="imageCropper=true">
        <i class="el-icon-upload" />
      </div>
    </div>
    <el-dialog :visible.sync="dialogShow" top="5vh" title="查看图片" append-to-body>
      <img v-if="dialogShow" :src="imgUrl" alt="" width="100%" height="100%">
    </el-dialog>

    <image-cropper v-if="imageCropper" :ki="keyId" :url="action" :width="params.width" :height="params.height" :no-circle="params.noCircle" @close="close" @crop-upload-success="cropUploadSuccess" />
  </div>

</template>
<script>
import imageCropper from '@/components/ImageCropper'
export default {
  components: { imageCropper },
  props: {
    action: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      imageCropper: false,
      dialogShow: false,
      params: {
        width: 200,
        height: 200,
        noCircle: true
      },
      keyId: 0,
      hover: false
    }
  },
  methods: {
    // 预览图片
    handlePicturePreview() {
      this.dialogShow = true
    },
    // 移除图片
    handleRemovePic() {
      this.$emit('handleRemove')
    },
    // 关闭裁剪窗口
    close() {
      this.imageCropper = false
    },
    cropUploadSuccess(resData) {
      console.log(resData, 'resData')
      this.imageCropper = false
      this.keyId += 1
      this.$emit('handleSuccess', resData.relativeFilePath)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.img-upload {
  width: 180px;
  height: 180px;
  border: dashed 1px darkgrey;
  border-radius: 10px;
  position: relative;
  .upload-img {
    position: absolute;
    width: 180px;
    height: 180px;
  }
  .bghover {
    opacity: .3;
    background-color: rgba(113, 129, 128, 0.77);
    transform: scale(2);
  }
  .icon-box {
    width: 100%;
    height: 40px;
    position: relative;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    .upload-img-handle-preview {
      position: absolute;
      display: inline-block;
      left: 30%;
      top: 50%;
      transform: translate(-70%, -50%);
      color: white;
      font-size: 30px;
    }
    .upload-img-remove-pic {
      position: absolute;
      left: 70%;
      top: 50%;
      display: inline-block;
      transform: translate(-30%, -50%);
      color: white;
      font-size: 30px;
    }
  }

  .upload-img-handle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    transform: translate(-50%, -50%);
    color: darkgrey;
    font-size: 50px;
  }
}

</style>
