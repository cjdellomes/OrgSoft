$(function () {

    // this file is for functions and requests to cache data globally
    // to be accessed from anywhere in the app
    
    window.parseDate = function (dateString) {
        return dateString.replace(dateString.match(/T(\S+)/)[0], '');
    };

    window.getDataById = function (arrayOfObjects, id) {
        return arrayOfObjects.filter(function (obj) { 
            if (obj.id === id) {
                return obj;
            } 
        })[0];
    };

    window.dataString = function (data) {
        var dataString = "";
        for (var property in data) {
            if (typeof data[property] === 'object') {
                dataString += 'data-' + property + '=\'' + JSON.stringify(data[property]) + '\' '; // bug when using double quotes \"
            } else {
                dataString += 'data-' + property + '=\"' + data[property] + '\" ';
            }
        }
        return dataString;
    };

    // ** will need this for enrollment tables
    // data - data to be stored in <tr> with data()
    // display - array of content (strings) to display in each <td> 
    // trAttributes - any extra attributes besides 'data-'
    window.buildRow = function (data, display, trAttributes) {
        var dataString = "";
        var tdString = "";
        for (var property in data) {
            dataString += 'data-' + property.toLowerCase() + '="' + data[property] + '" ';
        }
        display.forEach(function (column) {
            tdString += '<td>' + column + '</td>';
        });
        if (trAttributes) {
            var attributes = '';
            trAttributes.forEach(function (attr) {
                attributes += attr + ' ';
            });
            return '<tr ' + attributes + ' ' + dataString + '>' + tdString + '</tr>';
        } else {
            return '<tr ' + dataString + '>' + tdString + '</tr>';
        }
    };

    window.sessionStorageListeners = [];
    console.log('main test');

    window.sessionStorageListeners.forEach(function (listener) {
        console.log(listener);
        listener.ready();
    });
})