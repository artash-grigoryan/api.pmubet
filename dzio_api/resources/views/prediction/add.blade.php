@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Add prediction</div>

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


                    <form action="{{ url('admin/race/'.$raceId.'/prediction/add') }}" method="post">
                        {{ csrf_field() }}
                        <div class="form-group">
                            <label for="number">number</label>
                            <input type="text" class="form-control" id="number" name="number" value="{{ old('number')}}">
                        </div>
                        <div class="form-group">
                            <label for="runner">runner</label>
                            <input type="text" class="form-control" id="runner" name="runner" value="{{ old('runner')}}">
                        </div>
                        <div class="form-group">
                            <label for="rank">rank</label>
                            <input type="text" class="form-control" id="rank" name="rank" value="{{ old('rank')}}">
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
