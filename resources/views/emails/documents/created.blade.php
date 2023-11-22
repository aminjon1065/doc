<x-mail::message>
    # Здравствуйте!
    Вам отправлен новый документ: {{ $document->title }}
<x-mail::button :url="url('/documents/'.$document->id)">
Button Text
</x-mail::button>

Спасибо,<br>
{{ config('app.name') }}
</x-mail::message>
