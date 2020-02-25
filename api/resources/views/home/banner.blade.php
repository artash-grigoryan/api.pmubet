@extends('layouts.app')

@section('content')
<div class="container">
    @if($errors->any())
    <div class="alert alert-danger">
        {{$errors->first()}}
    </div>
    @endif
    @if (session('msg'))
    <div class="alert alert-success">
        {{ session('msg') }}
    </div>
    @endif
    <h1>Home page banner</h1>
    <form action="{{ route('updateBanner') }}" method="post" enctype="multipart/form-data">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="lang">Locale</label>
            <select name="lang" id="lang" class="form-control">
                <option value="">Language</option>
                <option value="en" @if (!empty($baner) && $baner->lang == 'en') selected @endif>English</option>
                <option value="fr" @if (!empty($baner) && $baner->lang == 'fr') selected @endif>Français</option>
                <option value="hy" @if (!empty($baner) && $baner->lang == 'hy') selected @endif>Հայերեն</option>
                <option value="ru" @if (!empty($baner) && $baner->lang == 'ru') selected @endif>Russian</option>
            </select>
        </div>
        <div class="form-group">
            <label for="image">Select image</label>
            <input type="file" id="image" name="image" class="form-control">
        </div>
        <div class="form-group">
            <label for="date">Select event date</label>
            <input class="date form-control" id="date" name="date" type="text">
        </div>
        <div class="form-group">
            <label for="date">Write event text</label>
            <textarea name="text" id="text" rows="10" class="form-control"></textarea>
        </div>

        <div class="form-group">
            <button type="button" class="btn btn-default">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
        </div>
    </form>
</div>


<script type="text/javascript">
    $(function () {
        $('.date').datepicker({
            format: 'mm-dd-yyyy'
        });
    });
</script>
@endsection