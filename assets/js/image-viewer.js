// MODULE Level Constants
const SLIDE_LIST = '.carousel';
const VISIBLE_CLASS = 'visible';

// GENERAL HELPER Functions
const get = function(searchStr) {
  const result = document.querySelector(searchStr);
  return result;
}
const getAll = function(searchStr) {
  const results = document.querySelectorAll(searchStr);
  return results;
}
const getNthChild = function(parent, n) {
  const children = get(parent).children;
  const nThChild = children.item(n);
  return nThChild;
}
const getClasses = function(element) {
  const classList = element.className.split(' ');
  return classList;
}
const classify = function(element, ...classesToAdd) {
  element = element.classList.add(...classesToAdd);
  return element;
}
const declassify = function(element, ...classesToRemove) {
  const currClasses = [...element.classList];
  classesToRemove.forEach(function(classToRemove) {
    if (currClasses.includes(classToRemove)) {
      element.classList.remove(classToRemove);
    }
  })
}
// IMAGE VIEWER functions
const getCurrentSlideNum = function() {
  const slideNodes= getAll(SLIDE_LIST + ' li');
  const slides = [...slideNodes];
  let currSlideNum;
  let classes;
  let i=-1;
  slides.forEach(function(slide) {
    i++;
    classes = getClasses(slide);
    if (classes.includes(VISIBLE_CLASS)) {
      currSlideNum = i;
    }
  })
  return currSlideNum;
}
const getCurrentSlide = function() {
  const currSlideNum = getCurrentSlideNum();
  const currSlide = getNthChild(SLIDE_LIST, currSlideNum);
  return currSlide;
}
const getPrevSlide = function() {
  const currSlideNum = getCurrentSlideNum();
  const prevSlide = getNthChild(SLIDE_LIST, currSlideNum-1);
  return prevSlide;
}
const getNextSlide = function() {
  const currSlideNum = getCurrentSlideNum();
  const nextSlide = getNthChild(SLIDE_LIST, currSlideNum+1);
  return nextSlide;
}
const movePrev = function() {
  const currSlide = getCurrentSlide();
  const prevSlide = getPrevSlide();
  declassify(currSlide, VISIBLE_CLASS);
  classify(prevSlide, VISIBLE_CLASS);
}
const moveNext = function() {
  const currSlide = getCurrentSlide();
  const nextSlide = getNextSlide();
  declassify(currSlide, VISIBLE_CLASS);
  classify(nextSlide, VISIBLE_CLASS);
}
const addNextBtnEvent = function(nextBtnSearchStr) {
  const nextBtn = get(nextBtnSearchStr);
  nextBtn.addEventListener('click', moveNext);
}
const addPrevBtnEvent = function(prevBtnSearchStr) {
  const prevBtn = get(prevBtnSearchStr);
  prevBtn.addEventListener('click', movePrev);
}

export {
  addNextBtnEvent,
  addPrevBtnEvent,
}