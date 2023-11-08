function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

setAttrValue("Signatory2", EdocsApi.getAttributeValue("DocInitiator").value);

function onChangeDocInitiator() {
  debugger;
  var initiator = EdocsApi.getAttributeValue("DocInitiator");
  var Signatory1 = EdocsApi.getAttributeValue("Signatory1");
  if (initiator && initiator.value) {
    var manager = EdocsApi.getEmployeeManagerByEmployeeID(initiator.value);
    if (manager) {
      Signatory1.value = manager.managerId;
      Signatory1.text = manager.shortName;
    } else {
      var unitLevel = EdocsApi.getEmployeeDataByEmployeeID(
        initiator.value
      ).unitLevel;
      for (let index = unitLevel; index > 0; index--) {
        var item = EdocsApi.getEmployeeManagerByEmployeeID(
          initiator.value,
          index
        );
        if (item) {
          Signatory1.value = item.employeeId;
          Signatory1.text = item.shortName;
        }
      }
    }
    EdocsApi.setAttributeValue(Signatory1);
  }
}
