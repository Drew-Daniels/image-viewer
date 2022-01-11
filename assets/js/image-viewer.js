// MODULE Level Constants
const SLIDE_LIST = '.carousel';
const NAV_CIRCLE_LIST = '.nav-circles';
const VISIBLE_CLASS = 'visible';
const HIDDEN_CLASS = 'hidden';

// GENERAL HELPER Functions
/**
 * 
 * @param {str} searchStr [Any normal string you would use with document.querySelector()]
 * @returns 
 */
const get = function(searchStr) {
  const result = document.querySelector(searchStr);
  return result;
}
/**
 * 
 * @param {str} searchStr [Plural version of get() - similar to document.querySelectorAll()]
 * @returns 
 */
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
const activateNavCircle = function(n) {
  const navCircle = getNthChild(NAV_CIRCLE_LIST, n);
  const filledImg = navCircle.querySelector('img.filled');
  const emptyImg = navCircle.querySelector('img.empty')
  declassify(filledImg, HIDDEN_CLASS);
  classify(emptyImg, HIDDEN_CLASS);
}
const deactivateNavCircle = function(n) {
  const navCircle = getNthChild(NAV_CIRCLE_LIST, n);
  const filledImg = navCircle.querySelector('img.filled');
  const emptyImg = navCircle.querySelector('img.empty')
  classify(filledImg, HIDDEN_CLASS);
  declassify(emptyImg, HIDDEN_CLASS);
}
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
  // Deactivate Old Nav Circles
  const oldSlideNum = getCurrentSlideNum();
  deactivateNavCircle(oldSlideNum);
  // Update Slides
  const currSlide = getCurrentSlide();
  const prevSlide = getPrevSlide();
  declassify(currSlide, VISIBLE_CLASS);
  classify(prevSlide, VISIBLE_CLASS);
  // Activate New Nav Circles
  const newSlideNum = getCurrentSlideNum();
  activateNavCircle(newSlideNum);
}
const moveNext = function() {
  // Deactivate Old Nav Circles
  const oldSlideNum = getCurrentSlideNum();
  deactivateNavCircle(oldSlideNum);
    // Update Slides
  const currSlide = getCurrentSlide();
  const nextSlide = getNextSlide();
  declassify(currSlide, VISIBLE_CLASS);
  classify(nextSlide, VISIBLE_CLASS);
  // Activate New Nav Circles
  const newSlideNum = getCurrentSlideNum();
  activateNavCircle(newSlideNum);
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
  getCurrentSlideNum,
}