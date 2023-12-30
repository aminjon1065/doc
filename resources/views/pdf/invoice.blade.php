<html lang={{$lang}}>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <style>
        @font-face {
            font-family: 'DejaVu Sans';
            src: local('DejaVu Sans'), local('DejaVuSans'), url('dejavusans.woff2') format('woff2'), url('dejavusans.woff') format('woff'), url('dejavusans.ttf') format('truetype');
            font-weight: 400;
            font-style: normal;
        }

        body {
            font-family: "dejavu sans", serif;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        h2 {
            text-align: center;
        }

        h3 {
            text-align: center;
        }

        img {
            width: 100px;
            height: 100px;
            display: block;
            margin: 0 auto;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
    <title>{{$lang==="ru" ? "Отчёт" : "Ҳисобот"}}</title>
</head>
<body>
<div style="text-align: center;">
    <img src="{{$imgsrc}}" alt="logo">
</div>
<h3>EDM</h3>
<h2 class="text-red-500">{{$startDate}}-{{$endDate}}</h2>
<h3>{{$filedToBlade}}</h3>
<table>
    <thead>
    <tr>
        <th>{{$lang==="ru" ? "Тип документа" : "Намуди ҳуҷҷат"}}</th>
        <th>{{$lang==="ru" ? "количество" : "миқдор"}}</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($documentCountsByType as $type => $count)
        <tr>
            <td>{{ $type }}</td>
            <td>{{ $count }}</td>
        </tr>
    @endforeach
    </tbody>
</table>
</body>
</html>
