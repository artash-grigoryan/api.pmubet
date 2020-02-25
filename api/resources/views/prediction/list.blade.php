@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Predictions
                </div>

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
                    <table class="table table-striped task-table">
                        <thead>
                        <th>id</th>
                        <th>number</th>
                        <th>runner</th>
                        <th>rank</th>
                        <th>Race label</th>
                        <th>date</th>
                        </thead>
                        <tbody>
                        @foreach ($predictions as $prediction)

                        <tr>
                            <td class="table-text"><div>{{ $prediction->id }}</div></td>
                            <td class="table-text"><div>{{ $prediction->number }}</div></td>
                            <td class="table-text"><div>{{ $prediction->runner }}</div></td>
                            <td class="table-text"><div>{{ $prediction->rank }}</div></td>
                            <td class="table-text alert-danger"><div>{{ $prediction->reporter->race->label }}</div></td>
                            <td class="table-text"><div>{{ $prediction->reporter->race->date }}</div></td>
                            <td class="table-text"><div>{{ !empty($prediction->translations) ? $prediction->translations : '' }}</div></td>
                            <td>
                                <a href="{{ url('admin/prediction/'.$prediction->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <td>
                                <form action="{{ url('/admin/runner/'.$prediction->id) }}" method="POST">
                                    {{ csrf_field() }}
                                    {{ method_field('DELETE') }}

                                    <button type="submit" class="btn btn-danger">
                                        <i class="fa fa-btn fa-trash"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                        @endforeach
                        </tbody>
                    </table>
                    <?php echo $predictions->render(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection