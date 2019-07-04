@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Edit prediction translation</div>

                <div class="panel-body">
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



                    <form action="{{ url('/admin/prediction/'.$prediction->id) }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="lang">Locale</label>
                            <select name="lang" id="lang" onchange="window.location = '{{ url('/admin/prediction/'.$prediction->id) }}/' + $(this).val()">
                                <option value="">Language</option>
                                <option value="en" @if ($prediction->lang == 'en') selected @endif>English</option>
                                <option value="fr" @if ($prediction->lang == 'fr') selected @endif>Français</option>
                                <option value="hy" @if ($prediction->lang == 'hy') selected @endif>Հայերեն</option>
                                <option value="ru" @if ($prediction->lang == 'ru') selected @endif>Russian</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="runner">runner</label>
                            <input type="text" class="form-control" id="runner" name="runner" value="{{ $prediction->runner or old('runner')}}">
                        </div>

                        <div class="form-group">
                            <a href="{{ URL::previous() }}">Go Back</a>
                            <button type="button" class="btn btn-default">Cancel</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
