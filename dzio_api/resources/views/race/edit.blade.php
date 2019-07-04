@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Edit race translation</div>

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

                    <form action="{{ url('/admin/race/'.$race->id) }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="lang">Locale</label>
                            <select name="lang" id="lang" onchange="window.location = '{{ url('/admin/race/'.$race->id) }}/' + $(this).val()">
                                <option value="">Language</option>
                                <option value="en" @if ($race->lang == 'en') selected @endif>English</option>
                                <option value="fr" @if ($race->lang == 'fr') selected @endif>Français</option>
                                <option value="hy" @if ($race->lang == 'hy') selected @endif>Հայերեն</option>
                                <option value="ru" @if ($race->lang == 'ru') selected @endif>Russian</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="label">Label</label>
                            <input type="text" class="form-control" id="label" name="label" value="{{ $race->label or old('label')}}">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea name="description" class="form-control"  id="description" cols="30" rows="5">{{ $race->description or old('description')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="gender">gender</label>
                            <textarea name="gender" class="form-control"  id="gender" cols="30" rows="5">{{ $race->gender or old('gender')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="labelLong">labelLong</label>
                            <textarea name="labelLong" class="form-control"  id="labelLong" cols="30" rows="5">{{ $race->labelLong or old('labelLong')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="type">type</label>
                            <textarea name="type" class="form-control"  id="type" cols="30" rows="5">{{ $race->type or old('type')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="discipline">discipline</label>
                            <textarea name="discipline" class="form-control"  id="discipline" cols="30" rows="5">{{ $race->discipline or old('discipline')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="comment">comment</label>
                            <textarea name="comment" class="form-control"  id="comment" cols="30" rows="5">{{ $race->comment or old('comment')}}</textarea>
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
