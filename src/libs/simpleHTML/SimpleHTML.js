const flatten = (items) => {
  const flat = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      flat.push(...flatten(item));
    } else {
      flat.push(item);
    }
  });

  return flat;
};

const html = (elementType, getProps, children) => {
  const element = document.createElement(elementType);

  // Assign props
  if (typeof getProps === 'function') {
    Object.assign(element, getProps());
  } else {
    Object.assign(element, getProps);
  }

  // Append children
  element.append(...flatten(children).filter(Boolean));

  element.update = () => {
    // We update the props only if they are provided as a function. Otherwise they are static.
    if (typeof getProps === 'function') {
      if (element.setSelectionRange && !element.type === 'number') {
        const { selectionStart, selectionEnd } = element;
        Object.assign(element, getProps());
        element.setSelectionRange(selectionStart, selectionEnd);
      } else {
        Object.assign(element, getProps());
      }
    }

    Array.from(element.childNodes).forEach((childNode) => {
      // We check that the parent node exists because a previous sibling might
      // be a logic element which has unmounted a later element
      if (typeof childNode.update === 'function' && childNode.parentNode) {
        childNode.update();
      }
    });
  };
  return element;
};

const createContentsContainer = () => {
  const element = Object.assign(document.createElement('div'), {
    style: 'display: contents;',
  });
  return element;
};

const Each = (getArray, mappingFunction) => {
  const logicElement = createContentsContainer();
  let array = getArray();
  const childNodes = flatten(
    array.map((_, i) =>
      mappingFunction(
        () => getArray()[i],
        () => i,
        getArray
      )
    )
  );

  logicElement.append(...childNodes);

  logicElement.update = () => {
    const newArray = getArray();

    if (newArray.length === array.length) {
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }

    // If some elements should be added
    if (newArray.length > array.length) {
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });

      const newChildNodes = flatten(
        newArray.slice(array.length).map((_, _i) => {
          const i = _i + array.length;
          return mappingFunction(
            () => getArray()[i],
            () => i,
            getArray
          );
        })
      );

      logicElement.append(...newChildNodes);

      array = newArray;
      return;
    }

    // If some elements should be removed
    if (newArray.length < array.length) {
      // Even if we already have nodes which can be updated to match the new
      // child nodes, we need to see how many nodes we should keep, since each
      // item in the array can potentially be mapped to several nodes.
      const newChildNodes = flatten(
        newArray.map((_, i) =>
          mappingFunction(
            () => getArray()[i],
            () => i,
            getArray
          )
        )
      );

      // Remove superfluous nodes
      const childrenToBeRemoved = Array.from(logicElement.childNodes).slice(
        newChildNodes.length
      );
      childrenToBeRemoved.forEach((childNodeToBeRemoved) => {
        logicElement.removeChild(childNodeToBeRemoved);
      });

      // Update variables
      array = newArray;

      // Update current child nodes
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
    }
  };

  return logicElement;
};

const If = (getCondition, getThenChildNodes, getElseChildNodes = () => []) => {
  const logicElement = createContentsContainer();
  let condition = getCondition();
  const childNodes = condition
    ? flatten(getThenChildNodes()).filter(Boolean)
    : flatten(getElseChildNodes()).filter(Boolean);

  logicElement.append(...childNodes);

  logicElement.update = () => {
    if (condition && getCondition()) {
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }
    if (!condition && getCondition()) {
      condition = true;
      const thenChildNodes = flatten(getThenChildNodes()).filter(Boolean);
      // Remove the old children
      logicElement.innerHTML = '';

      // Add the new children after the logic element
      logicElement.append(...thenChildNodes);
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }
    if (condition && !getCondition()) {
      condition = false;
      const elseChildNodes = flatten(getElseChildNodes()).filter(Boolean);
      // Remove the old children
      logicElement.innerHTML = '';

      // Add the new children
      logicElement.append(...elseChildNodes);
      Array.from(logicElement.childNodes).forEach((childNode) => {
        if (typeof childNode.update === 'function') {
          childNode.update();
        }
      });
      return;
    }
    Array.from(logicElement.childNodes).forEach((childNode) => {
      if (typeof childNode.update === 'function') {
        childNode.update();
      }
    });
  };
  return logicElement;
};

module.exports = {
  html,
  Each,
  If,
};
