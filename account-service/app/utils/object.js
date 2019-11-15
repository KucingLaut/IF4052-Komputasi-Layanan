function copyOnlyDefinedProps(paramObject) {
  const sourceObject = paramObject.source;

  Object.keys(sourceObject).forEach(property => {
    if (sourceObject[property] !== undefined) {
      paramObject.target[property] = sourceObject[property];
    }
  });
}

function returnOnlyDefinedProps(sourceObject, props) {
  let targetObject = {};

  props.forEach(property => {
    if (sourceObject[property] !== undefined) {
      targetObject[property] = sourceObject[property];
    }
  });

  return targetObject;
}

module.exports = {
  copyOnlyDefinedProps,
  returnOnlyDefinedProps
};
