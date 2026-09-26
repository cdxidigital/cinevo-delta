package me.cinevo.remote;

import android.app.Activity;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.net.Uri;
import android.os.Bundle;
import android.text.InputType;
import android.view.Gravity;
import android.view.ViewGroup;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

/** Sideload remote. Playback stays on the house; this activity only opens /remote. */
public class MainActivity extends Activity {
    private static final String PREFS = "cinevo-remote";
    private static final String ORIGIN = "origin";

    private LinearLayout root;
    private LinearLayout setup;
    private EditText address;
    private TextView status;
    private WebView web;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.parseColor("#050505"));
        setContentView(root);

        setup = new LinearLayout(this);
        setup.setOrientation(LinearLayout.VERTICAL);
        setup.setPadding(dp(24), dp(48), dp(24), dp(24));

        TextView title = new TextView(this);
        title.setText("CINEVO Remote");
        title.setTextColor(Color.WHITE);
        title.setTextSize(28);
        setup.addView(title);

        TextView help = new TextView(this);
        help.setText("Enter the address of your CINEVO house. This app sends play, pause, and seek only. The video stays on that screen.");
        help.setTextColor(Color.parseColor("#c8c8c8"));
        help.setTextSize(16);
        help.setPadding(0, dp(12), 0, dp(16));
        setup.addView(help);

        address = new EditText(this);
        address.setHint("https://your-cinevo");
        address.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_URI);
        address.setSingleLine(true);
        address.setTextColor(Color.WHITE);
        address.setHintTextColor(Color.parseColor("#8a8a8a"));
        address.setBackgroundColor(Color.parseColor("#141414"));
        address.setMinHeight(dp(52));
        address.setPadding(dp(12), dp(8), dp(12), dp(8));
        setup.addView(address);

        status = new TextView(this);
        status.setTextColor(Color.parseColor("#ff8b9a"));
        status.setPadding(0, dp(10), 0, dp(10));
        setup.addView(status);

        Button connect = new Button(this);
        connect.setText("Connect");
        connect.setOnClickListener(v -> connect());
        setup.addView(connect);

        web = new WebView(this);
        web.setBackgroundColor(Color.parseColor("#050505"));
        WebSettings settings = web.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri saved = Uri.parse(prefs().getString(ORIGIN, ""));
                String host = request.getUrl().getHost();
                return host == null || saved.getHost() == null || !host.equalsIgnoreCase(saved.getHost());
            }

            @Override
            public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                if (request.isForMainFrame()) showSetup("Could not open that house. Check the address and try again.");
            }
        });

        String saved = prefs().getString(ORIGIN, "");
        if (saved == null || saved.isEmpty()) showSetup("");
        else showWeb(saved);
    }

    private void connect() {
        String raw = address.getText().toString().trim();
        if (!raw.startsWith("http://") && !raw.startsWith("https://")) raw = "https://" + raw;
        Uri uri = Uri.parse(raw);
        String scheme = uri.getScheme();
        String host = uri.getHost();
        if (host == null || host.isEmpty() || scheme == null || !(scheme.equals("http") || scheme.equals("https"))) {
            showSetup("Use a full address, like https://cinevo.example.");
            return;
        }
        String origin = scheme + "://" + host;
        if (uri.getPort() != -1) origin += ":" + uri.getPort();
        prefs().edit().putString(ORIGIN, origin).apply();
        showWeb(origin);
    }

    private void showWeb(String origin) {
        root.removeAllViews();
        LinearLayout bar = new LinearLayout(this);
        bar.setOrientation(LinearLayout.HORIZONTAL);
        bar.setGravity(Gravity.CENTER_VERTICAL);
        bar.setPadding(dp(16), dp(12), dp(12), dp(8));
        TextView label = new TextView(this);
        label.setText("CINEVO Remote");
        label.setTextColor(Color.WHITE);
        label.setTextSize(16);
        LinearLayout.LayoutParams grow = new LinearLayout.LayoutParams(0, ViewGroup.LayoutParams.WRAP_CONTENT, 1f);
        label.setLayoutParams(grow);
        Button change = new Button(this);
        change.setText("Change house");
        change.setOnClickListener(v -> showSetup(""));
        bar.addView(label);
        bar.addView(change);
        root.addView(bar);
        web.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 0, 1f));
        root.addView(web);
        web.loadUrl(origin + "/remote");
    }

    private void showSetup(String message) {
        root.removeAllViews();
        root.addView(setup, new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        String saved = prefs().getString(ORIGIN, "");
        if (saved != null && !saved.isEmpty() && address.getText().length() == 0) address.setText(saved);
        status.setText(message == null ? "" : message);
    }

    private SharedPreferences prefs() {
        return getSharedPreferences(PREFS, MODE_PRIVATE);
    }

    private int dp(int value) {
        return Math.round(value * getResources().getDisplayMetrics().density);
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.getParent() != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
