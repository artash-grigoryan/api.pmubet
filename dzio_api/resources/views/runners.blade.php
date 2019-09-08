@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Runners</div>

                <div class="panel-body">
                    @if (session('msg'))
                    <div class="alert alert-success">
                        {{ session('msg') }}
                    </div>
                    @endif
                    <table class="table table-striped task-table">
                        <thead>
                        <th>id</th>
                        <th>name</th>
                        <th>breed</th>
                        <th>color</th>
                        <th>date</th>
                        </thead>
                        <tbody>
                        @foreach ($runners as $runner)

                        <tr @if ($runner->hasTranslation()) style="background-color: #1c7430; color: #FFF" @endif>
                            <td class="table-text"><div>{{ $runner->id }}</div></td>
                            <td class="table-text"><div>{{ $runner->name }}</div></td>
                            <td class="table-text"><div>{{ $runner->breed }}</div></td>
                            <td class="table-text"><div>{{ $runner->color }}</div></td>
                            <td class="table-text"><div>{{ $runner->race->date }}</div></td>
                            <td class="table-text"><div>{{ $runner->translations }}</div></td>
                            <td>
                                <a href="{{ url('admin/runner/'.$runner->id) }}" class="btn btn-primary">
                                    <i class="fa fa-btn fa-edit"></i>
                                </a>
                            </td>
                            <!-- Task Delete Button -->
                            <td>
                                <form action="{{ url('/admin/runner/'.$runner->id) }}" method="POST">
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
                    <?php echo $runners->render(); ?>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
