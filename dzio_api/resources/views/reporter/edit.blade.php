@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Edit reporter translation</div>

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



                    <form action="{{ url('/admin/reporter/'.$reporter->id) }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="lang">Locale</label>
                            <select name="lang" id="lang" onchange="window.location = '{{ url('/admin/reporter/'.$reporter->id) }}/' + $(this).val()">
                                <option value="">Language</option>
                                <option value="en" @if ($reporter->lang == 'en') selected @endif>English</option>
                                <option value="fr" @if ($reporter->lang == 'fr') selected @endif>Français</option>
                                <option value="hy" @if ($reporter->lang == 'hy') selected @endif>Հայերեն</option>
                                <option value="ru" @if ($reporter->lang == 'ru') selected @endif>Russian</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="societe">Societe</label>
                            <input type="text" class="form-control" id="societe" name="societe" value="{{ $reporter->societe or old('societe')}}">
                        </div>
                        <div class="form-group">
                            <label for="reporter">reporter</label>
                            <textarea name="reporter" class="form-control"  id="reporter" cols="30" rows="5">{{ $reporter->reporter or old('reporter')}}</textarea>
                        </div>

                        <div class="form-group">
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
