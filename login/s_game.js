global.mGAME = {};
global.GameInit = function( callback )
{
	mGAME.mTickCount = 0;
	mGAME.mMaxPlayerNum = 0;
	mGAME.mAddPlayerNum = 0;
	mGAME.mGagePlayerNum = 0;
	mGAME.mPresentPlayerNum = 0;
	mGAME.GetTickCount = GetTickCount;
	mGAME.CheckNameString = CheckNameString;
	mGAME.BufToStr = BufToStr;
	mGAME.StrToBuf = StrToBuf;
	mGAME.ReturnTime = ReturnTime;
	mGAME.ReturnAddDate = ReturnAddDate;
	mGAME.ReturnSubDate = ReturnSubDate;
	mDB.DB_PROCESS_01( function( callback ) 
	{
		if(callback == false)
		{
			console.log("Error::mDB.DB_PROCESS_01()");
			process.exit(1);
			return;
		}
	});
	return callback(true);
}
var GetTickCount = function()
{
	return process.hrtime()[0];
}
var CheckNameString = function(string)
{
	for (var i = 0; i < string.length; i++) 
	{
		var tUnicode = parseInt(string[i]);
		if(tUnicode == 0) // zero
		{
			continue;			
		}
		if ( ( tUnicode >= 48 ) && ( tUnicode <= 57 ) ) //0-9
		{
			continue;
		}
		if ( (tUnicode >= 65 ) && ( tUnicode <= 90 ) ) //A-Z
		{
			continue;
		}
		if ( ( tUnicode >= 97 ) && ( tUnicode <= 122 ) ) //a-z
		{
			continue;
		}
		return false;
	}
	return true;
}
var BufToStr = function(buf)
{
	return buf.toString('utf8').replace(/\0/g, '');
}
var StrToBuf = function(str)
{
	return Buffer(str);
}
var ReturnTime = function()
{
	var d = new Date();
	return sprintf( '%04d-%02d-%02d %02d:%02d:%02d', d.getFullYear(), ( d.getMonth() + 1 ), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds() );
}
var ReturnAddDate = function( tPostDateValue, tAddDayValue )
{
	//php version
	//$s;
	//if($tPostDateValue == 0)	
	//	$s = sprintf( '%04d-%02d-%02d', date("Y"), date("m"), date("d") );
	//else
	//	$s = sprintf( '%04d-%02d-%02d', substr($tPostDateValue,0,4), substr($tPostDateValue,4,2), substr($tPostDateValue,6,2) );
	//$date=date_create(date($s));
	//$a = $tAddDayValue .' days';
	//date_add($date,date_interval_create_from_date_string($a));
	//return date_format($date,"Ymd");
	
	//js version
	var s = tPostDateValue;
	var n = new Date();
	if(tPostDateValue == 0)	
		s = sprintf( '%04d-%02d-%02d', n.getFullYear(), n.getMonth + 1, n.getDate() );
	else
		s = sprintf( '%04d-%02d-%02d', s.substr(0,4), s.substr(4,2), s.substr(6,2) );
	var d = new Date(s);
	d.setDate( d.getDate() + tAddDayValue );
	return sprintf( '%04d%02d%02d', d.getFullYear(), d.getMonth + 1, d.getDate() );
}
var ReturnSubDate = function( tPostDateValue, tSubDayValue )
{
	/*if ( tPostDateValue <= tSubDayValue )
	{
		return 0;
	}*/	
	var d = new Date();
	var s = new Date( d.getTime() / ( 86409000 ) );
	//var s = sprintf( '%04d%02d%02d', r.getFullYear(), ( r.getMonth() + 1 ), r.getDate() );
	console.log( d.getTime() /  86409000    );
}
module.exports = global;
