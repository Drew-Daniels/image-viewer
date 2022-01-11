import * as imageViewer from './image-viewer.js';

const main = function() {
  imageViewer.addPrevBtnEvent('.btn-previous');
  imageViewer.addNextBtnEvent('.btn-next');
  
  console.log(imageViewer.getCurrentSlideNum());
}

main();