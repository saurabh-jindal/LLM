from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .llm_library import Llama2, Mistral

models = {
    "llama2": Llama2(),
    "mistral": Mistral()
}

conversation_context = []

@csrf_exempt
def select_model(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        model_name = body.get('model')
        if model_name in models:
            request.session['model'] = model_name
            conversation_context.clear()
            return JsonResponse({"message": f"Model {model_name} selected"})
        else:
            return JsonResponse({"error": "Model not found"}, status=400)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def query(request):
    if request.method == 'POST':
        model_name = request.session.get('model')
        if not model_name:
            return JsonResponse({"error": "No model selected"}, status=400)
        model = models[model_name]
        body = json.loads(request.body)
        question = body.get('question')
        conversation_context.append({"question": question})
        response = model.query(question, context=conversation_context)
        conversation_context.append({"response": response})
        return JsonResponse({"response": response})
    return JsonResponse({"error": "Invalid request method"}, status=405)
