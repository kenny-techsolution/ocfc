angular.module('app').directive('ocfcMultiEmailInput', function () {
	return{
		restrict: 'A',
		require : 'ngModel',
		scope: {
		},
		link: function ($scope) {
			ngModel.$parsers.push(function(inputValue) {
				if (inputValue == undefined)
					return '';
				//we may need to call this function when implementing the error handling story.
				//resetMessages();
				var formattedInputValue = inputValue;
				var letters = /^[0-9\,]+$/;

				//this function ensure commas are inserted to the right places.
				function autoInsertCommas (inputValue) {
                	var newInputValue = '';
                	var commaDelimitedDigits = inputValue.split(/[ ,]+/);
                    var isValidEndingComma = (inputValue[inputValue.length-1]===',') && (commaDelimitedDigits[commaDelimitedDigits.length-2].length === 5);
                	inputValue = commaDelimitedDigits.join('');
					if(isValidEndingComma) inputValue += ',';
                	for(var i=0; i<inputValue.length; i++) {
                		if((i % 5) === 0 && i !== 0 && inputValue[i] !== ',') {
                			newInputValue += ',' + inputValue[i];
                		} else {
                			newInputValue += inputValue[i];
                		}
                		if((i+1) === inputValue.length) return newInputValue;
                	}
                }

                //1. remove any invalid characters
				if(!formattedInputValue.match(letters)){
					formattedInputValue = formattedInputValue.replace(/[^0-9\,]/g, ' ');
					formattedInputValue = formattedInputValue.split(/[ ,]+/).join(',');
				}

				//2. ensure the input has the right commas
				formattedInputValue = autoInsertCommas(formattedInputValue);

				//3. if formatted input is different than the original input, then overwrite the model's view value.
				if(formattedInputValue === inputValue) {
					return;
				} else {
					ngModel.$setViewValue(formattedInputValue);
					ngModel.$render();
					return;
				}

			});

		}
	};
});
