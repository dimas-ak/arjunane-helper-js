String.prototype.addZero = function ()
{
    var value = parseInt(this);
    if(isNaN(value)) return this;

    return value < 10 ? "0" + value : value.toString();
}
/**
 * 
 * @param {string} date
 * @param {string} format 
 * @param {object} props 
 * 
 * props
 * - days           : ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
 * - shortDays      : ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
 * - months         : ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
 * - shortMonths    : ['Jan',  'Feb', "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
 */
var FormatDate = function(date, format, props) 
{
    this.days       = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    this.shortDays  = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    this.months     = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    this.shortMonths= ['Jan',  'Feb', "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

    this.props      = props;

    if(typeof date === 'undefined')
    {
        throw Error("Date is null! Please set Date as string");
    }

    if(typeof format === 'undefined')
    {
        format = "l, d F Y";
    }

    this.date   = date;
    this.format = format;
}

FormatDate.prototype.__setProps = function ()
{
    if(typeof this.props !== 'undefined')
    {
        var props = this.props;
        if(typeof props['days']         !== 'undefined') this.days       = props['days'];
        if(typeof props['shortDays']    !== 'undefined') this.shortDays  = props['shortDays'];
        if(typeof props['months']       !== 'undefined') this.months     = props['months'];
        if(typeof props['shortMonths']  !== 'undefined') this.shortMonths= props['shortMonths'];
    }
}

FormatDate.prototype.toString = function()
{
    return this.__setDate();
}

FormatDate.prototype.__setDate = function ()
{
    var dateClass = new Date(this.date);
    var format = this.format.split("");

    var result = "";

    var formats = 
    {
        "Y" : dateClass.getFullYear().toString(),
        "y" : dateClass.getFullYear().toString().substring(1),
        "l" : this.days[dateClass.getDay()],
        "D" : this.shortDays[dateClass.getDay()],
        "F" : this.months[dateClass.getMonth()],
        "M" : this.shortMonths[dateClass.getMonth()],
        "d" : dateClass.getDate().toString().addZero(),
        "m" : dateClass.getMonth().toString().addZero(),
        "n" : dateClass.getMonth().toString(),
        "H" : dateClass.getHours().toString().addZero(),
        "i" : dateClass.getMinutes().toString().addZero(),
        "s" : dateClass.getSeconds().toString().addZero(),
        "w" : dateClass.getDay(),

    };

    for(var i in format)
    {
        var fm = format[i];
        if(typeof formats[fm] !== 'undefined') result += formats[fm];
        else result += fm;
    }
    
    return result;
}
/**
 * 
 * @param {string} src required
 * @param {string} fileName required
 */
function downloadImage(src, fileName)
{
    var isBase64 = false;
    try {
        window.atob(src);
        isBase64 = true;
    } catch(e) {
        // something failed

        // if you want to be specific and only catch the error which means
        // the base 64 was invalid, then check for 'e.code === 5'.
        // (because 'DOMException.INVALID_CHARACTER_ERR === 5')
    }

    if(typeof src !== 'string') throw Error("First parameter must be a STRING");

    if(typeof fileName === 'undefined')
    {
        if(isBase64) fileName = "images";
        else
        {
            fileName = src.split("/").pop();
        }
    }
    var el = document.createElement("a");
    el.setAttribute("href", src);
    el.setAttribute("download", fileName);
    document.body.appendChild(el);
    el.click();
    el.remove();
}

function rupiah(angka)
{
    var rupiah = '';		
    var angkarev = angka.toString().split('').reverse().join('');
    for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
    return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
}

/**
 * ON KEYUP
 */
var keyTmpListener = "";
var onKeyupTmp = {};

function onKeyup(key, callback)
{
    if(typeof key !== 'string')
    {
        throw Error("First parameter must be a 'STRING'");
    }

    if(typeof callback !== 'function')
    {
        throw Error("Second parameter must be a 'FUNCTION'");
    }
    onKeyupTmp[key] = callback;
}

window.addEventListener("keyup", function (evt) {
    
    for(var keyUp in onKeyupTmp)
    {
        var key = evt.key.toLowerCase();
        if(keyUp.toLowerCase() === key)
        {
            onKeyupTmp[keyUp](evt);
        }
    }
});

// window.addEventListener("keydown", function(evt) {
//     console.log("KEYDOWN : " + evt.key)
// });