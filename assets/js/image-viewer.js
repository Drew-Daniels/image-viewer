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
const getCurrentSlideNum = function(slideList, visibleClass) {
  const slideNodes= getAll(slideList + ' li');
  const slides = [...slideNodes];
  let currSlideNum;
  let classes;
  let i=-1;
  slides.forEach(function(slide) {
    i++;
    classes = getClasses(slide);
    if (classes.includes(visibleClass)) {
      currSlideNum = i;
    }
  })
  return currSlideNum;
}
const getCurrentSlide = function(slideList, visibleClass) {
  const currSlideNum = getCurrentSlideNum(slideList, visibleClass);
  const currSlide = getNthChild(slideList, currSlideNum);
  return currSlide;
}
const getPrevSlide = function(slideList, visibleClass) {
  const currSlideNum = getCurrentSlideNum(slideList, visibleClass);
  const prevSlide = getNthChild(slideList, currSlideNum-1);
  return prevSlide;
}
const getNextSlide = function(slideList, visibleClass) {
  const currSlideNum = getCurrentSlideNum(slideList, visibleClass);
  const nextSlide = getNthChild(slideList, currSlideNum+1);
  return nextSlide;
}
const movePrev = function(slideList, visibleClass) {
  const currSlide = getCurrentSlide(slideList, visibleClass);
  const prevSlide = getPrevSlide(slideList, visibleClass);
  declassify(currSlide, visibleClass);
  classify(prevSlide, visibleClass);
}
const moveNext = function(slideList, visibleClass) {
  const currSlide = getCurrentSlide(slideList, visibleClass);
  const nextSlide = getNextSlide(slideList, visibleClass);
  declassify(currSlide, visibleClass);
  classify(nextSlide, visibleClass);
}

export {
  movePrev,
  moveNext,
}