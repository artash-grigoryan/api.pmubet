@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Edit runner translation</div>

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

                    <form action="{{ url('/admin/runner/'.$runner->id) }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="lang">Locale</label>
                            <select name="lang" id="lang">
                                <option value="">Language</option>
                                <option value="en" @if ($runner->lang == 'en') selected @endif>English</option>
                                <option value="fr" @if ($runner->lang == 'fr') selected @endif>Français</option>
                                <option value="hy" @if ($runner->lang == 'hy') selected @endif>Հայերեն</option>
                                <option value="ru" @if ($runner->lang == 'ru') selected @endif>Russian</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" class="form-control" id="name" name="name" value="{{ $runner->name or old('name')}}">
                        </div>
                        <div class="form-group">
                            <label for="breed">breed</label>
                            <textarea name="breed" class="form-control"  id="breed" cols="30" rows="5">{{ $runner->breed or old('breed')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="color">color</label>
                            <textarea name="color" class="form-control"  id="color" cols="30" rows="5">{{ $runner->color or old('color')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="dress">dress</label>
                            <textarea name="dress" class="form-control"  id="dress" cols="30" rows="5">{{ $runner->dress or old('dress')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="father">father</label>
                            <textarea name="father" class="form-control"  id="father" cols="30" rows="5">{{ $runner->father or old('father')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="mother">mother</label>
                            <textarea name="mother" class="form-control"  id="mother" cols="30" rows="5">{{ $runner->mother or old('mother')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="owner">owner</label>
                            <textarea name="owner" class="form-control"  id="owner" cols="30" rows="5">{{ $runner->owner or old('owner')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="coach">coach</label>
                            <textarea name="coach" class="form-control"  id="coach" cols="30" rows="5">{{ $runner->coach or old('coach')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="jokey">jokey</label>
                            <textarea name="jokey" class="form-control"  id="jokey" cols="30" rows="5">{{ $runner->jokey or old('jokey')}}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="farmer">farmer</label>
                            <textarea name="farmer" class="form-control"  id="farmer" cols="30" rows="5">{{ $runner->farmer or old('farmer')}}</textarea>
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
