<x-mail::message>
    # Здравствуйте!
    Напоминание, по поводу документа: {{ $document->title }}
    <x-mail::button :url="url('/documents/'.$document->id)">
        Открыть документ
    </x-mail::button>
    Спасибо,<br>
    {{ config('app.name') }}
</x-mail::message>
